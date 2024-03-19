import {} from "hono"
import type { Head, Meta } from "./types"

declare module "hono" {
  type ContextRenderer = (
    content: string | Promise<string>,
    head?: Head,
    meta?: Meta & { frontmatter: Meta },
  ) => Response | Promise<Response>
}
