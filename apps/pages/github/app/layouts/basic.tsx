/** @jsxRuntime automatic */
/** @jsxImportSource hono/jsx */

import { Style } from "hono/css"
import type { Child, FC } from "hono/jsx"
import { MinimumLayout, type MinimumLayoutProps } from "./minimum"

export interface BasicLayoutProps extends MinimumLayoutProps {}

export const BasicLayout: FC<BasicLayoutProps> = (props: BasicLayoutProps) => {
  const head = (
    <>
      {/* <link rel="canonical" href={{PAGE_URL}} /> */}
      {/* TODO ^ figure out current canonical url... */}
      <meta name="description" content={props.description} />
      {/* <meta property="og:image" content={props.image} /> */}
      {/* recommend using a pwa icon and splash generator to make additional icons/splash */}
      <link rel="icon" type="image/png" href="/favicon@32.png" />
      <link rel="icon" sizes="192x192" href="/icon@192.png" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      {/*
        if you keep the top of the page dark, can use apple-mobile-web-app-status-bar-style black-translucent
        https://developer.apple.com/documentation/uikit/uibarstyle/blacktranslucent
        these css env functions help https://developer.mozilla.org/en-US/docs/Web/CSS/env#using_env_to_ensure_buttons_are_not_obscured_by_device_ui
      */}
      {props.additionalHead}
      <script src="/static/js/nav.js" type="module" async />
    </>
  )
  return (
    <MinimumLayout title={props.title} additionalHead={head}>
      <div id="root" class="flex flex-col flex-1 relative">
        {/* <div class="absolute inset-0 bg-gradient-to-r from-teal-200 to-teal-500 dark:from-slate-500 dark:to-slate-800" /> */}
        <div class="relative flex-1 w-full">
          <Nav />
          <div
            class="flex flex-1 min-h-full pt-12"
            style="padding-top: max(env(safe-area-inset-top, 8px), 48px); padding-bottom: max(env(safe-area-inset-bottom, 16px), 16px);"
          >
            {props.children}
          </div>
          {/*
            https://developer.chrome.com/blog/overscroll-behavior
            height: 100%;
            overflow-y: auto;
            overscroll-behavior: contain
          */}
        </div>
      </div>
    </MinimumLayout>
  )
}

export const Nav: FC = () => {
  return (
    <>
      <header
        class="inset-x-0 top-0 py-2 px-4 duration-100 fixed bg-header backdrop-blur-sm flex flex-col items-center"
        style="padding-top: max(env(safe-area-inset-top, 8px), 8px);"
      >
        <div class="flex flex-1 items-center justify-between gap-8 w-full max-w-screen-xs sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl 3xl:max-w-screen-3xl">
          <div class="hidden gap-6 flex-none w-48 md:flex justify-start">
            <a
              href="https://github.com/replicator-cli/replicator-cli"
              class="block p-2 dark:text-white"
              rel="noopener noreferrer"
              target="_blank"
            >
              Github
            </a>
            {/* <div class="block p-2 dark:text-white">Discord</div> */}
          </div>
          <a
            href="/"
            class="block text-2xl md:text-3xl lg:text-4xl p-2 font-black italic tracking-widest dark:text-white"
          >
            replicator-cli
          </a>
          <div class="hidden gap-6 flex-none w-48 md:flex justify-end">
            <a href="/articles/journey" class="block p-2 dark:text-white">
              Journey
            </a>
            <a href="/docs" class="block p-2 dark:text-white">
              Docs
            </a>
          </div>
          <div class="md:hidden w-8">
            <MenuButton title="Open navigation" data-action="openMobileNav" />
          </div>
        </div>
      </header>
      <MobileMenu />
    </>
  )
}

interface CloseButtonProps extends Hono.ButtonHTMLAttributes {
  title: string
}

export const MenuButton: FC<CloseButtonProps> = ({ title, ...buttonProps }) => {
  return (
    <button
      type="button"
      class="absolute right-6 top-5 flex h-8 w-8 items-center justify-center"
      {...buttonProps}
    >
      <span class="sr-only">{title}</span>
      <svg
        class="h-5 w-5 overflow-visible"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>{title}</title>
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </button>
  )
}

export const CloseButton: FC<CloseButtonProps> = ({ title, ...buttonProps }) => {
  return (
    <button
      type="button"
      class="absolute right-6 top-8 flex h-5 w-5 items-center justify-center"
      {...buttonProps}
    >
      <span class="sr-only">{title}</span>
      <svg
        class="h-5 w-5 overflow-visible"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>{title}</title>
        <path d="M0 0L14 14M14 0L0 14" />
      </svg>
    </button>
  )
}

export const MobileMenu: FC = ({ children }) => {
  // When hidden - mobile-nav-backdrop = opacity-0 pointer-events-none, mobile-nav-slide-panel = translate-x-full
  // on open mobile-nav-backdrop = opacity-100 pointer-events-auto, mobile-nav-slide-panel = translate-x-0
  // backdrop click to close
  //
  // TODO focus trap
  return (
    <div
      class="fixed inset-0 z-50 overflow-hidden lg:hidden pointer-events-none"
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      <button
        data-id="mobile-nav-backdrop"
        data-action="closeMobileNav"
        class="absolute inset-0 bg-black/25 backdrop-blur-sm transition-opacity opacity-0 pointer-events-none cursor-default"
        type="button"
        tabindex={-1}
      />
      <div class="fixed inset-0 overflow-hidden">
        <div class="fixed inset-0 flex items-start justify-end overflow-y-auto translate-x-0">
          <div
            data-id="mobile-nav-panel"
            class="min-h-full overscroll-contain w-[min(20rem,calc(100vw-theme(spacing.10)))] bg-white shadow-2xl ring-1 ring-black/10 transition pointer-events-auto translate-x-full"
          >
            <h2 class="sr-only">Navigation</h2>
            <CloseButton
              title="Close navigation"
              data-action="closeMobileNav"
              class="z-10"
              tabindex={-1}
            />

            <nav class="divide-y divide-slate-900/10 text-base leading-7 text-slate-900">
              <div class="px-8 py-6">
                <a class="block font-black italic overflow-hidden" href="/" tabindex={-1}>
                  replicator-cli
                </a>
              </div>
              <div class="px-8 py-6">
                <div class="-my-2 items-start space-y-2">
                  <a class="block w-full py-2 font-semibold" href="/docs" tabindex={-1}>
                    Docs
                  </a>
                  <a class="block w-full py-2 font-semibold" href="/articles/journey" tabindex={-1}>
                    Journey
                  </a>
                </div>
              </div>
              <div class="px-8 py-6">
                <div class="-my-2 items-start space-y-2">
                  <a
                    class="block w-full py-2 font-semibold"
                    href="https://github.com/replicator-cli/replicator-cli"
                    tabindex={-1}
                  >
                    Github
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}
