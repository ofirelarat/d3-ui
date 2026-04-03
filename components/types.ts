import { ReactNode } from "react";
import { LabelProps } from "./primitives/Label";

// 1. Data Points
export type DataPoint<X = number, Y = number> = {
  x: X;
  y: Y;
};

// 2. Base Series (Color & Label)
export interface SeriesBase {
  color?: string;
  label: string;
}

// 3. Series with Array Data (Area, Line, Bar, Scatter)
export interface SeriesData<T = DataPoint> extends SeriesBase {
  data: T[];
}

export type ChartData<T = DataPoint> = Record<string, SeriesData<T>>;

export type AreaData = ChartData<DataPoint>;
export type LineData = ChartData<DataPoint>;
export type ScatterData = ChartData<DataPoint>;
export type BarData = ChartData<DataPoint<string | number | Date, number>>;

// 4. Pie Chart Data
export interface PieSeriesData extends SeriesBase {
  value: number;
}
export type PieData = Record<string, PieSeriesData>;

// 5. Heatmap Data
export interface HeatmapSeriesData extends SeriesBase {
  data: number[][];
}
export type HeatmapData = Record<string, HeatmapSeriesData>;

// 6. Gauge Data
export interface GaugeData extends SeriesBase {
  value: number;
}

// 7. Treemap Data
export interface TreemapNodeData {
  name: string;
  value?: number;
  color?: string;
  children?: TreemapNodeData[];
}
export interface TreemapData {
  name: string;
  children: TreemapNodeData[];
}

// 8. Chord Diagram Data
export interface ChordRibbon {
  label: string; // Target category
  sourceValue: number; // Flow from source group to target group
  targetValue: number; // Flow from target group to source group
  color?: string; // Optional custom color for this connection
}

export interface ChordSeries extends SeriesBase {
  ribbons: ChordRibbon[];
}

export type ChordData = ChordSeries[];

// 9. Shared Props
export interface ChartLabelProps {
  labelFormatter?: (value: any) => ReactNode;
  variant?: LabelProps["variant"];
  className?: string;
}

export interface BaseSeriesProps {
  dataKey: string;
  label?: ChartLabelProps;
}

export interface BaseContainerProps<T> {
  data: T;
  width?: number;
  height?: number;
  children: ReactNode;
}
