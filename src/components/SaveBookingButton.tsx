import { BookmarkPlus } from "lucide-react";
import { saveBookingDraft } from "../lib/demo-store";
import { useTranslations } from "../i18n/react";
import { useState } from "react";

type SaveBookingButtonProps = {
  draft: {
    tourSlug: string;
    tourName: string;
    location: string;
    travelDate: string;
    travelers: string;
    totalLabel: string;
  };
};

export default function SaveBookingButton({ draft }: SaveBookingButtonProps) {
  const { t } = useTranslations();
  const [saved, setSaved] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        saveBookingDraft(draft);
        setSaved(true);
        window.location.assign("/account#saved-plans");
      }}
      className="btn-secondary gap-2"
    >
      <BookmarkPlus className="h-4 w-4" />
      {saved ? t("booking.saved") : t("booking.save")}
    </button>
  );
}
