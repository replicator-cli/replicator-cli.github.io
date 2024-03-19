import type { Meta } from "../types"
import HomeContent from "./_index.mdx"

export default function Top() {
  const posts = import.meta.glob<{ frontmatter: Meta }>("./docs/*.mdx", {
    eager: true,
  })
  return (
    <div class="lg:pt-12 flex flex-col items-start gap-8 max-w-prose mx-auto">
      <div class="px-4 py-20 max-w-prose mx-auto prose md:prose-md lg:prose-lg xl:prose-xl 2xl:prose-2xl dark:prose-invert prose-img:rounded-xl">
        <HomeContent />
      </div>
      {/* <h2 class="text-3xl dark:text-white font-bold tracking-tight sm:text-4xl">Posts</h2> */}
      {/* <ul class="flex flex-col items-start gap-4">
        {Object.entries(posts).map(([id, module]) => {
          if (module.frontmatter) {
            return (
              <li>
                <a class="underline dark:text-white" href={`${id.replace(/\.mdx$/, '')}`}>{module.frontmatter.title}</a>
              </li>
            )
          }
        })}
      </ul> */}
    </div>
  )
}
