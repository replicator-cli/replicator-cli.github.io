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
      {children}
    </BasicLayout>
  )
})

