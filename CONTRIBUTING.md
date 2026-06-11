# Contributing

Travelio is structured as a reusable frontend demo, so contributions should keep the repo easy to read, extend, and adapt.

## Development flow

1. Install dependencies with `npm install`
2. Start the project with `npm run dev`
3. Validate changes with:

```bash
npm run build
npm run check
```

## Project rules

- Keep static presentation in `.astro` files when no client state is needed
- Use React islands only for interactive behavior
- Reuse shared primitives from `src/components/ui/` before adding new UI controls
- Add new user-facing copy to `src/i18n/messages.ts`
- Keep mock content in `src/data/`
- Keep demo persistence and local storage logic in `src/lib/`

## Scope discipline

- Avoid unrelated refactors in the same change
- Remove dead code when you touch nearby areas
- Prefer small, obvious abstractions over generic ones
- Keep route pages thin and move repeated UI into `src/components/`

## Useful entry points

- `src/pages/index.astro`
- `src/components/SearchBoxClient.tsx`
- `src/components/ToursExplorerClient.tsx`
- `src/components/ui/`
- `src/lib/demo-store.ts`
- `docs/architecture.md`
