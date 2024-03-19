// This could easily be an "island"... but that's going to lead to more runtime js to jsx render
// TODO add focus trap

window.addEventListener("scroll", () => {
  window.document.documentElement.style.setProperty("--scroll-y", `${window.scrollY}px`)
})

const state = {
  open: false,
  scrollY: 0,
  $backdrop: null,
  $panel: null,
}
function openMobileNav(evt) {
  if (state.open) return
  state.open = true
  state.scrollY = window.document.documentElement.style.getPropertyValue("--scroll-y")
  for (const el of state.$panel.querySelectorAll("a")) {
    el.tabIndex = "0"
  }
  state.$backdrop.classList.add("opacity-100", "pointer-events-auto")
  state.$backdrop.classList.remove("opacity-0", "pointer-events-none")
  state.$panel.classList.add("translate-x-0")
  state.$panel.classList.remove("translate-x-full")
  window.document.body.style.position = "fixed"
  window.document.body.style.top = `-${state.scrollY}`
}

function closeMobileNav() {
  if (!state.open) return
  state.open = false
  window.document.body.style.position = ""
  window.document.body.style.top = ""
  window.scrollTo(0, Number.parseInt(state.scrollY || "0"))
  for (const el of state.$panel.querySelectorAll("a")) {
    el.tabIndex = "-1"
  }
  state.$backdrop.classList.add("opacity-0", "pointer-events-none")
  state.$backdrop.classList.remove("opacity-100", "pointer-events-auto")
  state.$panel.classList.add("translate-x-full")
  state.$panel.classList.remove("translate-x-0")
}

function init() {
  state.$backdrop = window.document.querySelector('[data-id="mobile-nav-backdrop"]')
  state.$panel = window.document.querySelector('[data-id="mobile-nav-panel"]')
  for (const el of window.document.querySelectorAll('[data-action="openMobileNav"]')) {
    el.addEventListener("click", openMobileNav)
  }
  for (const el of window.document.querySelectorAll('[data-action="closeMobileNav"]')) {
    el.addEventListener("click", closeMobileNav)
  }
  window.addEventListener("keydown", (evt) => {
    if (state.open) {
      if (evt.key === "Escape") {
        closeMobileNav()
      }
    }
  })
}

window.openMobileNav = openMobileNav
window.closeMobileNav = closeMobileNav

init()
