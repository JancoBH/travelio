import { useState } from "react";
import UiDateField from "./ui/UiDateField";

type DemoDateFieldProps = {
  id: string;
  name?: string;
  initialValue: string;
  ariaLabel: string;
};

export default function DemoDateField({
  id,
  name,
  initialValue,
  ariaLabel,
}: DemoDateFieldProps) {
  const [value, setValue] = useState(initialValue);

  return (
    <UiDateField
      id={id}
      name={name}
      value={value}
      onChange={setValue}
      ariaLabel={ariaLabel}
    />
  );
}
