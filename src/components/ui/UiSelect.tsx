import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

type UiSelectProps = {
  value: string;
  onValueChange: (value: string) => void;
  options: Array<{
    value: string;
    label: string;
  }>;
  placeholder?: string;
  ariaLabel?: string;
};

export default function UiSelect({
  value,
  onValueChange,
  options,
  placeholder,
  ariaLabel,
}: UiSelectProps) {
  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger
        aria-label={ariaLabel}
        className="field-surface w-full justify-between pl-4 pr-3.5 text-left text-sm text-brand-text outline-none"
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon className="shrink-0 text-brand-muted">
          <ChevronDown className="h-4 w-4" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={8}
          className="z-50 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-3xl border border-brand-border bg-white p-2 shadow-[0_24px_64px_rgba(6,20,35,0.18)]"
        >
          <Select.Viewport className="space-y-1">
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className="flex min-h-11 cursor-pointer items-center justify-between rounded-2xl border border-transparent px-4 py-3 text-sm text-brand-muted outline-none transition data-[highlighted]:border-brand-teal/15 data-[highlighted]:bg-brand-bg data-[highlighted]:text-brand-text data-[state=checked]:bg-brand-bg/80 data-[state=checked]:text-brand-text"
              >
                <Select.ItemText>{option.label}</Select.ItemText>
                <Select.ItemIndicator className="ml-3 shrink-0">
                  <Check className="h-4 w-4 text-brand-teal" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
