import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const site = process.env.GITHUB_PAGES_SITE ?? "https://your-user.github.io";
const base = process.env.GITHUB_PAGES_BASE ?? "/TourBookingPlatform";
const astroBin = resolve(
  fileURLToPath(new URL("..", import.meta.url)),
  "node_modules",
  "astro",
  "bin",
  "astro.mjs",
);

const result = spawnSync(process.execPath, [astroBin, "build"], {
  stdio: "inherit",
  env: {
    ...process.env,
    PUBLIC_SITE_URL: site,
    PUBLIC_BASE_PATH: base,
  },
});

if (result.error) {
  throw result.error;
}

process.exit(result.status ?? 1);
