import { BasicLayout, MinimumLayout } from "@/layouts/basic"
import { jsxRenderer } from "hono/jsx-renderer"
import { HasIslands, Script } from "honox/server"

export default jsxRenderer(({ children, title, description, frontmatter }) => {
  const head = (
    <>
      {import.meta.env.PROD ? (
        <HasIslands>
          <script type="module" src="/static/client.js" />
        </HasIslands>
      ) : (
        <Script src="/app/client.ts" />
      )}
    </>
  )
  return (
    <BasicLayout title={title} description={description} additionalHead={head}>
      <div
        style="max-width: min(100vw, 65ch);"
        class="px-4 py-20 mx-auto break-words prose md:prose-md lg:prose-lg xl:prose-xl 2xl:prose-2xl dark:prose-invert prose-img:rounded-xl"
      >
        {children}
      </div>
    </BasicLayout>
  )
})
