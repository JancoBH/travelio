# Travelio

Travelio is a modern **tours and experiences booking platform** built with Astro, React, TypeScript, and Tailwind CSS.

It is designed as a **portfolio-ready frontend base** that can also be reused as a starting point for client work or a real product.

## What it includes

- Responsive home page
- Tours listing and tour detail pages
- Booking flow and confirmation page
- Destinations listing and detail pages
- User dashboard and admin dashboard
- About, contact, and blog pages
- Reusable UI primitives and shared mock data
- Basic `EN / ES` i18n foundation
- Component reference page at `/admin/components`

## Reusable UI

The codebase is intentionally split into:

- `src/components/` for product-facing sections such as `PageHero`, `TourCard`, `DestinationCard`, and layout pieces
- `src/components/ui/` for low-level reusable controls such as `UiSelect`, `UiPopover`, and `UiPriceSlider`
- `src/data/` for demo data that can later be replaced by an API or CMS
- `src/i18n/` for locale messages and runtime language switching
- `src/lib/` for demo state, local persistence, and shared client-side helpers

This keeps the project easier to extend without mixing content, layout, and interaction logic.

You can open `/admin/components` in the running app to inspect the shared form controls, picker, select, and price slider used by the demo.

## Stack

- Astro
- React
- TypeScript
- Tailwind CSS
- Radix UI
- Lucide icons

## Run locally

Requirements:

- Node.js `22.12.0` or newer
- npm

Install dependencies:

```bash
npm install
```

Start development:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## GitHub Pages

Build with GitHub Pages settings:

```bash
npm run build:github-pages
```

The repo already includes:

- `scripts/build-github-pages.mjs`
- `.github/workflows/deploy-pages.yml`

## Project structure

```text
src/
  components/   Shared UI and interactive islands
  data/         Mock data
  i18n/         Translation messages and helpers
  lib/          Demo state and shared client helpers
  layouts/      Shared layout shells
  pages/        Route entrypoints
  styles/       Global styling
scripts/        Build helpers
docs/           Internal project guidance
```

## Demo notes

This project is intentionally frontend-focused.

- data is mocked
- auth is demo state
- favorites are local/demo behavior
- booking is not connected to payments or a backend

For a real product, the main replacement points are `src/data`, auth, booking state, and API integration.

## How to extend it

- Add new mock content in `src/data/`
- Add new locale keys in `src/i18n/messages.ts`
- Keep static sections in Astro and move only interactive behavior to React islands
- Reuse existing primitives in `src/components/ui/` before creating new controls
- Follow [docs/architecture.md](docs/architecture.md) for project conventions

## Architecture

See [docs/architecture.md](docs/architecture.md) for the project conventions used to keep the codebase consistent, reusable, and easy to extend.

## License

This project is licensed under the [MIT License](LICENSE).
