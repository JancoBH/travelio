import * as Slider from "@radix-ui/react-slider";

type UiPriceSliderProps = {
  min: number;
  max: number;
  value: number;
  step?: number;
  onValueChange: (value: number) => void;
};

export default function UiPriceSlider({
  min,
  max,
  value,
  step = 50,
  onValueChange,
}: UiPriceSliderProps) {
  return (
    <Slider.Root
      min={min}
      max={max}
      step={step}
      value={[value]}
      onValueChange={(next) => onValueChange(next[0] ?? value)}
      className="relative flex h-8 w-full touch-none select-none items-center cursor-pointer"
    >
      <Slider.Track className="relative h-2 grow rounded-full bg-slate-200">
        <Slider.Range className="absolute h-full rounded-full bg-brand-accent" />
      </Slider.Track>
      <Slider.Thumb className="block h-5 w-5 cursor-grab rounded-full border-2 border-white bg-brand-dark shadow-md outline-none ring-offset-2 transition focus-visible:ring-2 focus-visible:ring-brand-teal active:cursor-grabbing" />
    </Slider.Root>
  );
}
