# Travelio

Travelio is a modern tours and experiences booking platform built with Astro, React, TypeScript, and Tailwind CSS.

It is designed as a reusable frontend base for portfolio work, client demos, and real product adaptation.

## Live Demo

Public demo: [jancobh.github.io/travelio](https://jancobh.github.io/travelio/)

## Start here

If you are opening this repository for the first time, these are the most useful entry points:

- `src/pages/index.astro`: storefront entry page
- `src/components/SearchBoxClient.tsx`: largest booking-oriented search interaction
- `src/components/ToursExplorerClient.tsx`: filters, sorting, and listing behavior
- `src/components/ui/`: reusable controls and charts
- `src/lib/demo-store.ts`: local demo persistence layer
- `docs/architecture.md`: project conventions and extension rules

## Why this repo is useful

- Real multi-page product structure, not just a landing page
- Storefront plus account and admin surfaces
- Reusable UI primitives for forms, filters, charts, and booking flows
- Demo state with local persistence for wishlist, saved plans, profile, and admin drafts
- Static-first Astro architecture with React only where interaction is needed
- Ready for GitHub Pages deployment

## Included views

- Home
- Tours listing
- Tour details
- Booking flow
- Booking confirmation
- Destinations listing
- Destination detail
- User account
- Admin dashboard
- Component reference at `/admin/components`
- About, contact, and blog pages

## Tech stack

- Astro
- React
- TypeScript
- Tailwind CSS
- Radix UI
- Lucide React

## Project structure

```text
src/
  components/      Product-facing sections and interactive islands
  components/ui/   Reusable low-level UI primitives
  data/            Mock content and demo datasets
  i18n/            Translation messages and locale helpers
  lib/             Demo state, local persistence, and shared helpers
  layouts/         Shared layout shells
  pages/           Route entrypoints
  styles/          Global styling
scripts/           Build helpers
docs/              Public project guidance
```

## Reusable UI

The codebase is organized so repeated interaction patterns stay reusable instead of being copied per page.

Examples:

- `UiSelect`
- `UiDateField`
- `UiPopover`
- `UiPriceSlider`
- `UiBarChart`
- `UiDonutChart`
- `FavoriteButton`

The running demo also exposes a component reference page at `/admin/components`.

## Local development

Requirements:

- Node.js `22.12.0` or newer
- npm

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Build locally:

```bash
npm run build
```

Run project checks:

```bash
npm run check
```

Preview the production build:

```bash
npm run preview
```

## GitHub Pages

This repo is prepared for GitHub Pages deployment through GitHub Actions.

Build locally with the GitHub Pages base path:

```bash
npm run build:github-pages
```

Included files:

- `scripts/build-github-pages.mjs`
- `.github/workflows/deploy-pages.yml`

If your repository name is `travelio`, the deployed base path becomes `/travelio`.

## Demo limitations

This project is intentionally frontend-focused.

- Data is mocked
- Auth is demo-only
- Wishlist and saved plans are stored locally
- Booking is not connected to a payment provider
- Admin actions update demo state only

## How to adapt it for a real product

- Replace `src/data/` with API or CMS data
- Swap demo auth for a real session layer
- Move booking state and favorites to a backend
- Connect admin actions to real inventory and booking endpoints
- Extend `src/i18n/messages.ts` or replace with a full i18n pipeline

## Contributing

This repo is meant to be easy to fork and extend.

Before opening a change:

- Reuse existing primitives in `src/components/ui/` before adding new controls
- Keep static sections in Astro and move interaction into React only when needed
- Add new user-facing strings to `src/i18n/messages.ts`
- Keep mock content in `src/data/`
- Run `npm run build` and `npm run check`

## Documentation

Project conventions live in [docs/architecture.md](docs/architecture.md).

That file is intentionally committed because it explains how the repo is structured and how to extend it without breaking consistency.

## License

This project is licensed under the [MIT License](LICENSE).
