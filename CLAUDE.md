# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server on **port 3000** (set in `vite.config.ts`; the README's 5173 is outdated)
- `npm run build` — `tsc` type-check, then `vite build` into `dist/`
- `npm run preview` — serve the production build
- `npm run lint` — ESLint (flat config, minimal rules)

There is no test suite. `npm run build` is the verification step: `tsc` runs with `strict` and `noEmit`, so type errors fail the build.

## Architecture

Single-page React 19 + Vite + TypeScript portfolio, deployed on Vercel (`vercel.json` rewrites every path to `index.html` for client-side routing and caches `/assets/*` as immutable). Several files still carry `"use client"` and Next.js-style APIs from an earlier Next.js version. These are leftovers and have no effect under Vite.

- **Routing / shell** (`src/App.tsx`): `BrowserRouter` → `LangProvider` → `SmoothScroll`, wrapping global chrome (`Preloader`, `StarsCanvas` 3D background, `Navbar`, `Footer`) around three routes: `/` (`pages/home.tsx`: Hero, Projects, Skills), `/about`, `/work`. Home sections are anchored by id (e.g. `/#skills` in the navbar).
- **i18n** (`src/lib/lang-context.tsx`): `useLang()` returns `lang: "EN" | "PT"`. Detection order is `localStorage["lang"]`, then `navigator.language` (`pt*` → PT). All user-facing copy is in `src/constants/translations.ts` (`TRANSLATIONS[lang]...`). Content data in `src/constants/index.ts` (`PROJECTS`, `TESTIMONIALS`) is also keyed by `EN`/`PT`. **Any new text or project entry must be added to both languages.**
- **Project galleries**: `gallery(slug, desktopCount, mobileCount)` in `constants/index.ts` builds paths of the form `/images/projects/<slug>/desktop-N.webp` and `mobile-N.webp`, served from `public/`. To add screenshots, put correctly numbered `.webp` files in that folder and update the counts. Projects can also have a `video` field (from `video(slug)`): in that case the home Projects section shows a looping video of the whole site (about 8–20s) instead of the screenshots. Each video needs three files, `public/videos/projects/<slug>/{desktop,mobile}.webm`, `.mp4` (fallback) and `.webp` (poster). The `/work` page still uses the screenshots.
- **Scroll coordination**: `SmoothScroll` creates a Lenis instance and exposes it as `window.__lenis`. `Link` (`components/ui/link.tsx`) and `ScrollToTop` use it to scroll; use it the same way, not `window.scrollTo`, so scrolling stays smooth. Lenis stays stopped until `Preloader` sets `window.__preloaderCompleted` and dispatches the `preloaderComplete` window event.
- **UI wrappers**: `components/ui/link.tsx` and `components/ui/image.tsx` mimic `next/link` and `next/image` (`href` objects, `fill`, `priority`). `Link` sends `http(s):`, `mailto:`, `tel:` and `#` URLs to a plain `<a>` and everything else to React Router.
- **Component layout**: `components/main/` holds page-level sections and global chrome, `components/sub/` holds pieces used inside those sections, and `components/ui/` holds primitives.
- **Animation stack**: Framer Motion for most UI motion (shared variants in `lib/motion.ts`), GSAP (with `TextPlugin`) for the hero typewriter, and `@react-three/fiber` + `drei` for the star background and hero cosmos.
- **Styling**: Tailwind 3 with custom `brand.gold` / `brand.amber` / `brand.glow` colors and an `outfit` font family (`tailwind.config.ts`). Global styles live in `src/globals.css`. The Inter and Outfit fonts load from Google Fonts in `index.html`.
- **Imports**: use the `@/*` alias for `src/*` (resolved by `vite-tsconfig-paths`).

## Resumes (CV)

The site serves `public/Curriculo_Schaide_Nunes_2026.pdf` (PT) and `public/Resume_Schaide_Nunes_2026.pdf` (EN); the mapping is in `components/sub/hero-content.tsx`. Their sources are generated locally by `Curriculo base - gerador/`: `node gen.js <pt.js|en.js> <out.html> <out.md>` renders the data modules through `build.js` + `style.css`. That folder, the generated root-level `.html`/`.md` resumes and the `Backup curriculos*/` folders are gitignored. Only the PDFs are committed. When resume content changes, keep the root PDFs and the `public/` copies in sync.

## Repo automation

`.github/workflows/update-readme.yml` runs on every push to `main` (except README-only changes). It rewrites the README between the `<!--- DEPENDENCIES_START/END --->` and `<!--- FOLDER_STRUCTURE_START/END --->` markers and pushes a bot commit, so pull before you push. Code comments and data are partly in Portuguese.
