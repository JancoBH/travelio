import { Heart } from "lucide-react";
import { toggleWishlist, type FavoriteItem } from "../lib/demo-store";
import { useWishlist } from "../lib/use-demo-store";
import { useTranslations } from "../i18n/react";

type WishlistActionButtonProps = {
  item: FavoriteItem;
};

export default function WishlistActionButton({ item }: WishlistActionButtonProps) {
  const wishlist = useWishlist();
  const { t } = useTranslations();
  const active = wishlist.some((entry) => entry.id === item.id);

  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={() => toggleWishlist(item)}
      className={[
        "btn-secondary mt-3 w-full gap-2",
        active ? "border-rose-300 bg-rose-50 text-rose-600 hover:border-rose-400 hover:text-rose-700" : "",
      ].join(" ")}
    >
      <Heart className={`h-4 w-4 ${active ? "fill-current" : ""}`} />
      {active ? t("wishlist.remove") : t("tourDetail.wishlist")}
    </button>
  );
}
