"use client";
import { useRef, useState } from "react";
import { cn } from "@/app/lib/utils";

interface TooltipProps {
  children: (props: {
    show: (options: { content: string; title?: string; color?: string }, e: React.MouseEvent) => void;
    hide: () => void;
  }) => React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export function Tooltip({ children, className, contentClassName }: TooltipProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [tooltipData, setTooltipData] = useState<{ content: string; title?: string; color?: string }>({ content: "" });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const show = (options: { content: string; title?: string; color?: string }, e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTooltipData(options);
    setPosition({ x, y });
    setVisible(true);
  };

  const hide = () => setVisible(false);

  return (
    <div ref={containerRef} className={cn("relative w-fit h-fit", className)}>
      {children({ show, hide })}

      {visible && (
        <div
          className={cn(
            "absolute pointer-events-none border border-gray-200 bg-white dark:bg-gray-50 text-gray-900 text-xs rounded-lg shadow-lg",
            "transition-opacity duration-150",
            contentClassName
          )}
          style={{
            top: position.y,
            left: position.x,
            transform: "translate(10px, -50%)",
            opacity: visible ? 1 : 0,
          }}
        >
          {(tooltipData.title || tooltipData.color) && (
            <div className="flex items-center gap-2 px-3 py-1.5">
              {tooltipData.color && (
                <div 
                  className="w-2 h-2 rounded-sm flex-shrink-0"
                  style={{ 
                    backgroundColor: tooltipData.color,
                    minWidth: '8px',
                    minHeight: '8px',
                  }}
                />
              )}
              {tooltipData.title && (
                <span className="font-medium whitespace-nowrap">{tooltipData.title}</span>
              )}
            </div>
          )}
          <div className="px-3 py-1.5">
            {tooltipData.content}
          </div>
        </div>
      )}
    </div>
  );
}
