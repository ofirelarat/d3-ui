export const code = `import Heatmap from "@/components/Heatmap";

const data = {
  temperatures: {
    data: [
      [10, 20, 30, 40, 50],
      [15, 25, 35, 45, 55],
      [5, 15, 25, 35, 45],
      [0, 10, 20, 30, 40],
      [12, 22, 32, 42, 52],
    ],
    color: "#1e40af", // Blue
    label: "Temperature (°C)"
  },
  humidity: {
    data: [
      [80, 75, 70, 65, 60],
      [85, 80, 75, 70, 65],
      [90, 85, 80, 75, 70],
      [95, 90, 85, 80, 75],
      [100, 95, 90, 85, 80],
    ],
    color: "#059669", // Green
    label: "Humidity (%)"
  },
  pressure: {
    data: [
      [1000, 1002, 1004, 1006, 1008],
      [1002, 1004, 1006, 1008, 1010],
      [1004, 1006, 1008, 1010, 1012],
      [1006, 1008, 1010, 1012, 1014],
      [1008, 1010, 1012, 1014, 1016],
    ],
    color: "#dc2626", // Red
    label: "Pressure (hPa)"
  },
  windSpeed: {
    data: [
      [5, 8, 12, 15, 18],
      [6, 10, 14, 17, 20],
      [4, 7, 11, 14, 17],
      [3, 6, 10, 13, 16],
      [7, 11, 15, 18, 21],
    ],
    color: "#7c3aed", // Purple
    label: "Wind Speed (m/s)"
  }
};

<Heatmap.Container data={data} width={500} height={400}>
  <Heatmap.Tile dataKey="temperatures" />
  <Heatmap.Tile dataKey="humidity" />
  <Heatmap.Tile dataKey="pressure" />
  <Heatmap.Tile dataKey="windSpeed" />
  <Heatmap.Legend />
</Heatmap.Container>
`;
