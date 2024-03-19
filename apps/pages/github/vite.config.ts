import ssg from "@hono/vite-ssg"
import mdx from "@mdx-js/rollup"
import honox from "honox/vite"
import client from "honox/vite/client"
import remarkFrontmatter from "remark-frontmatter"
import remarkMdxFrontmatter from "remark-mdx-frontmatter"
import { dirname, resolve } from "node:path"
import { URL, fileURLToPath } from "node:url"
import { defineConfig } from "vite"
// import wasm from "vite-plugin-wasm"
// import topLevelAwait from "vite-plugin-top-level-await"

const entry = "./app/server.ts"

export default defineConfig(({ mode }) => {
  const base = {
    build: {
      outDir: "build",
    },
    resolve: {
      alias: [
        { find: "@", replacement: fileURLToPath(new URL("./app", import.meta.url)) },
        {
          find: /^\/static\/(.*?)\.js/,
          replacement: resolve(
            // Node 18 support, for 20 or upper, `import.meta.dirname` also works
            dirname(fileURLToPath(import.meta.url)),
            "build/static/$1.js",
          ),
        },
      ],
    },
  }
  if (mode === "client") {
    return {
      ...base,
      build: {
        ...base.build,
        rollupOptions: {
          input: ["/app/style.css"],
          output: {
            assetFileNames: "static/assets/[name].[ext]",
            entryFileNames: "static/[name].js",
          },
        },
      },
      // https://hono.dev/getting-started/cloudflare-pages#client-side
      // build: {
      //   rollupOptions: {
      //     input: './src/client.ts',
      //     output: {
      //       entryFileNames: 'static/client.js',
      //     },
      //   },
      // },
      plugins: [client()],
    }
  }
  return {
    ...base,
    build: {
      ...base.build,
      emptyOutDir: false,
    },
    plugins: [
      // wasm(),
      // topLevelAwait(),
      honox({ entry }),
      ssg({ entry }),
      mdx({
        jsxImportSource: "hono/jsx",
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      }),
    ],
    publicDir: "public",
  }
})
