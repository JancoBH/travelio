const base = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");

export function resolveUrl(path: string): string {
  if (path.startsWith("/")) {
    return `${base}${path}`;
  }
  return path;
}
