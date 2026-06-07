import * as Popover from "@radix-ui/react-popover";
import type { ReactNode } from "react";

export function UiPopover({
  open,
  onOpenChange,
  trigger,
  content,
  align = "start",
  contentClassName = "",
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: ReactNode;
  content: ReactNode;
  align?: "start" | "center" | "end";
  contentClassName?: string;
}) {
  return (
    <Popover.Root open={open} onOpenChange={onOpenChange}>
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          sideOffset={8}
          align={align}
          className={`z-50 rounded-3xl border border-brand-border bg-white p-4 shadow-[0_24px_64px_rgba(6,20,35,0.18)] outline-none ${contentClassName}`}
        >
          {content}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
