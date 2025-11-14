import { cn } from "../lib/utils";

interface LegendItem {
  label: string;
  color: string;
}

interface LegendProps {
  className?: string;
  itemClassName?: string;
  items: LegendItem[];
}

export function Legend({ items, className, itemClassName }: LegendProps) {
  return (
    <div className={cn("flex flex-wrap gap-4 mt-4", className)}>
      {items.map((item) => (
        <div
          key={item.label}
          className={cn("flex items-center gap-2", itemClassName)}
        >
          <span
            className="block w-4 h-4 rounded-sm "
            style={{ backgroundColor: item.color }}
          ></span>
          <span className="text-sm">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
