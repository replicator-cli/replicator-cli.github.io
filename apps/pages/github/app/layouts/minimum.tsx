/** @jsxRuntime automatic */
/** @jsxImportSource hono/jsx */

import { Style } from "hono/css"
import type { Child, FC } from "hono/jsx"

export interface MinimumLayoutProps {
  additionalHead?: Child
  title?: string
  description?: string
  children?: Child
}

export const MinimumLayout: FC<MinimumLayoutProps> = (props: MinimumLayoutProps) => {
  return (
    <html lang="en" class="min-h-full flex flex-col">
      <head>
        <meta charset="utf-8" />
        <title>{props.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {import.meta.env.PROD ? (
          <link rel="stylesheet" href="/static/assets/style.css" />
        ) : (
          <link rel="stylesheet" href="/app/style.css" />
        )}
        <Style />
        {props.additionalHead}
      </head>
      <body class="flex flex-col w-screen flex-1 bg-gradient-to-r from-teal-300 to-teal-400 dark:from-slate-700 dark:to-slate-800">{props.children}</body>
    </html>
  )
}
