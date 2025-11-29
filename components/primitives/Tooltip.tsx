"use client";
import { createContext, useContext, useRef, useState, ReactNode } from "react";
import { cn } from "../lib/utils";

type TooltipContextType = {
  show: (options: { content: string; title?: string; color?: string }, e: React.MouseEvent) => void;
  hide: () => void;
} | null;

const TooltipContext = createContext<TooltipContextType>(null);

export const useTooltip = () => {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error("useTooltip must be used within a TooltipProvider");
  }
  return context;
};

interface TooltipProviderProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

interface TooltipProps {
  children: (props: {
    show: (options: { content: string; title?: string; color?: string }, e: React.MouseEvent) => void;
    hide: () => void;
  }) => React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export function TooltipProvider({ children, className, contentClassName }: TooltipProviderProps) {
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

  const value = { show, hide };

  return (
    <div ref={containerRef} className={cn("relative w-fit h-fit", className)}>
      <TooltipContext.Provider value={value}>
        {children}
      </TooltipContext.Provider>

      {visible && (
        <div
          className={cn(
            "absolute pointer-events-none border border-gray-200 bg-white text-gray-900 text-xs rounded-lg shadow-lg",
            "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-50",
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
