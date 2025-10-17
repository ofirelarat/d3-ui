"use client";
import React from "react";
import clsx from "clsx";

export type LabelVariant =
  | "text"
  | "circle"
  | "square"
  | "circle-text"
  | "none";

export interface LabelProps {
  value: any;
  variant?: LabelVariant;
  color?: string;
  x?: number;
  y?: number;
  formatter?: (value: any) => React.ReactNode;
  className?: string;
  offset?: { x?: number; y?: number };
}

export const Label: React.FC<LabelProps> = ({
  value,
  variant = "text",
  color = "#333",
  x = 0,
  y = 0,
  formatter,
  className,
  offset = { x: 0, y: 0 },
}) => {
  const renderContent = () => {
    if (formatter)
      return (
        <foreignObject x={x} y={y} width={80} height={30}>
          {formatter(value)}
        </foreignObject>
      );

    switch (variant) {
      case "circle":
        return <circle cx={x} cy={y} r={5} fill={color} />;

      case "square":
        return <rect x={x - 5} y={y - 5} width={10} height={10} fill={color} />;

      case "circle-text":
        return (
          <g transform={`translate(${x},${y})`}>
            <circle r={5} fill={color} />
            <text
              x={offset.x ?? 8}
              y={offset.y ?? 4}
              fill={color}
              fontSize={12}
              className="select-none"
            >
              {value}
            </text>
          </g>
        );

      case "none":
        return null;
      case "text":
      default:
        return (
          <text
            x={x + (offset.x ?? 0)}
            y={y + (offset.y ?? 0)}
            fill={"black"}
            fontSize={12}
            className="select-none"
          >
            {value}
          </text>
        );
    }
  };

  return <g className={clsx("label", className)}>{renderContent()}</g>;
};
