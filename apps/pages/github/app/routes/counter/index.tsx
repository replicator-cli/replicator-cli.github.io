import { css } from "hono/css"
import { createRoute } from "honox/factory"
import Counter from "@/islands/counter"


export default createRoute((c) => {
  const name = c.req.query("name") ?? "no name"
  return c.render(
    <div class="px-4">
      <h1>Hello, {name}!</h1>
      <div class="relative isolate overflow-hidden bg-gray-900 p-6 shadow-2xl sm:rounded-3xl sm:p-8 lg:flex lg:gap-x-20 lg:p-12">
        <svg viewBox="0 0 1024 1024" class="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0" aria-hidden="true">
          <circle cx="512" cy="512" r="512" fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fill-opacity="0.7" />
          <defs>
            <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
              <stop stop-color="#7775D6" />
              <stop offset="1" stop-color="#E935C1" />
            </radialGradient>
          </defs>
        </svg>
        <div class="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:text-left">
          <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">Boost your productivity.<br />Start using our app today.</h2>
          <p class="mt-6 text-lg leading-8 text-gray-300">Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel nulla.</p>
          <div class="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
            <Counter />
          </div>
        </div>
      </div>

    </div>
  )
})
