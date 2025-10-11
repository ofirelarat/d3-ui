interface LegendItem {
  label: string;
  color: string;
}

interface LegendProps {
  items: LegendItem[];
}

export function Legend({ items }: LegendProps) {
  return (
    <div className="flex flex-wrap gap-4 mt-4">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <span
            className="block w-4 h-4 rounded-sm"
            style={{ backgroundColor: item.color }}
          ></span>
          <span className="text-sm text-gray-700 dark:text-gray-300">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
