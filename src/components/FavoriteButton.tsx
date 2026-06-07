import { Heart } from "lucide-react";
import { toggleWishlist, type FavoriteItem } from "../lib/demo-store";
import { useWishlist } from "../lib/use-demo-store";

type FavoriteButtonProps = {
  ariaLabel: string;
  item: FavoriteItem;
  light?: boolean;
};

export default function FavoriteButton({ ariaLabel, item, light = false }: FavoriteButtonProps) {
  const wishlist = useWishlist();
  const active = wishlist.some((entry) => entry.id === item.id);

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-pressed={active}
      onClick={(event) => {
        event.preventDefault();
        toggleWishlist(item);
      }}
      className={[
        "flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-sm transition",
        light
          ? active
            ? "border-rose-300 bg-rose-500 text-white"
            : "border-white/60 bg-white/86 text-brand-text hover:bg-white"
          : active
            ? "border-rose-300 bg-rose-500 text-white"
            : "border-white/40 bg-white/12 text-white hover:bg-white/20",
      ].join(" ")}
    >
      <Heart className={`h-4 w-4 ${active ? "fill-current" : ""}`} />
    </button>
  );
}
