import { cn } from "../lib/utils";

export interface LegendItem {
  label: string;
  color?: string;
}

export interface LegendProps {
  className?: string;
  itemClassName?: string;
  items: LegendItem[];
  orientation?: "horizontal" | "vertical";
  position?: "top" | "bottom" | "left" | "right";
}

export function Legend({ 
  items, 
  className, 
  itemClassName,
  orientation = "horizontal" 
}: LegendProps) {
  return (
    <div className={cn(
      "flex flex-wrap gap-4 mt-4",
      orientation === "vertical" ? "flex-col items-start" : "flex-row items-center justify-center",
      className
    )}>
      {items.map((item) => (
        <div
          key={item.label}
          className={cn("flex items-center gap-2", itemClassName)}
        >
          <span
            className="block w-3.5 h-3.5 ring-2 ring-white dark:ring-slate-800"
            style={{ 
              backgroundColor: item.color,
              borderRadius: "var(--tooltip-radius, 50%)" 
            }}
          ></span>
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
