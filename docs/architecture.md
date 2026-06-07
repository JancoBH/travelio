# Architecture

This document defines the conventions used in Travelio to keep the project consistent, clean, and easy to reuse.

## Core idea

Travelio is an **experiences-first booking frontend**.

It models:

- tours
- day trips
- guided activities
- attraction experiences
- multi-stop planning

It does **not** treat flights or hotel booking as the core product.

## Design principles

1. Keep pages easy to scan.
2. Reuse UI before duplicating markup.
3. Keep interactive logic isolated.
4. Use stable values for logic and translated labels for UI.
5. Prefer small, obvious abstractions over generic ones.

## Rendering strategy

### Use Astro for

- page composition
- static sections
- route-level layout
- content-heavy UI with little or no state

### Use React for

- popovers
- dropdowns
- filters
- local interactive state
- i18n runtime switching
- client-only UI behavior

If a component does not need state, effects, or event handling, it should usually stay in Astro.

## Folder responsibilities

```text
src/
  components/   Feature and layout components
  components/ui Reusable low-level UI primitives
  data/         Mock content and static demo datasets
  i18n/         Locale messages and translation helpers
  lib/          Shared client-side helpers and demo persistence
  layouts/      Shared page shells
  pages/        Route entrypoints
  styles/       Global styling
```

## Component rules

### `components/`

Use for domain or page-facing building blocks:

- `HeroSection`
- `TourCard`
- `DestinationCard`
- `PageHero`

### `components/ui/`

Use for reusable primitives:

- `UiSelect`
- `UiPopover`
- `UiPriceSlider`

If the same control pattern appears more than once, move it toward `components/ui/` or extract a local helper component.

## Reusable UI inventory

Current primitives and shared building blocks:

- `UiSelect`: shared select/dropdown behavior for filters and search controls
- `UiDateField`: shared typed date input and lightweight calendar picker
- `UiPopover`: popover shell used by search and lightweight overlays
- `UiPriceSlider`: client-side price filtering
- `StatusPill`: shared booking status presentation
- `PageHero`: route hero wrapper for secondary pages
- `TourCard` / `DestinationCard`: storefront listing cards

Document reusable parts only when they are actually stable in code. Do not advertise a component API that the repo does not consistently follow.

The running demo exposes a compact component reference at `/admin/components`. Keep that page aligned with the primitives above so contributors can inspect the intended UI patterns without reading every route first.

## State rules

- Keep state as small as possible.
- Avoid storing values that can be derived.
- Use `useMemo` for computed UI values when it improves clarity.
- Avoid broad shared state unless the UI actually needs it.

## Data rules

Mock data lives in `src/data/`.

This keeps content separate from rendering and makes later backend replacement easier.

When adding new data:

1. define a clear TypeScript shape
2. keep field names stable
3. avoid embedding UI-only formatting in data values

Demo persistence and local product behavior live in `src/lib/`.

Use this layer for:

- localStorage-backed wishlist state
- saved booking drafts
- demo profile/settings data
- small shared client helpers

## i18n rules

Translations live in `src/i18n/messages.ts`.

Rules:

1. Store UI strings as translation keys when they are shared or user-facing.
2. Keep logic values stable and language-independent.
3. Translate labels, not behavior.
4. Prefer central keys over hardcoded strings inside interactive components.

Good pattern:

- value: `"top-rated"`
- label: `"Top Rated"` or translated equivalent

Bad pattern:

- value: `"Mejor valorado"` used in filtering logic

## Styling rules

- Use Tailwind utilities directly in components.
- Reuse design tokens already defined in the project.
- Prefer semantic colors and spacing patterns already present in the repo.
- Avoid introducing one-off styles when an existing pattern already works.

## Accessibility rules

- Interactive elements must be real buttons, links, inputs, or selects.
- Keep focus states visible.
- Add labels or `aria-label` where text is not visible.
- Use descriptive alt text for content images.

## Reuse rules

Before adding a new component or utility, check:

1. does a similar component already exist?
2. can a primitive be extended instead?
3. is this page-specific or reusable?

Do not create abstractions just because two things look similar. Extract only when the shared responsibility is real.

## How to extend the project

When adding a new feature:

1. Decide if it is static (`.astro`) or interactive (`.tsx`).
2. Keep new content in `src/data/` unless it is truly UI-only.
3. Add translation keys before scattering new strings through components.
4. Reuse an existing primitive before creating a new one.
5. Keep route pages thin and move repeated UI into `components/`.

## Cleanup rules

When touching a file:

- remove dead code nearby
- tighten overly broad types
- collapse repeated UI into a helper when repetition is obvious
- do not refactor unrelated parts without a reason

## Recommended future improvements

- Add route-level localized metadata
- Finish i18n coverage across all remaining pages
- Add tests for filters, search state, and booking flow
- Introduce a small `UiButton` / `UiInput` layer if repetition grows further
