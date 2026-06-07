// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

const site = process.env.PUBLIC_SITE_URL;
const base = process.env.PUBLIC_BASE_PATH;

// https://astro.build/config
export default defineConfig({
  ...(site ? { site } : {}),
  ...(base ? { base } : {}),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
