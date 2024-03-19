import { useState } from "hono/jsx"

export default function Counter() {
  const [count, setCount] = useState(0)
  return (
    <div class="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
      <button
        type="button"
        class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {count}
      </button>
      <button
        type="button"
        onClick={() => setCount(count + 1)}
        class="text-sm font-semibold leading-6 text-white"
      >
        Increment <span aria-hidden="true">+</span>
      </button>
    </div>
  )
}
