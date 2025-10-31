
export const code = `<GaugeChart.Container
  data={[
    { label: "Completed", value: 60, color: "#34d399" },
    { label: "Pending", value: 40, color: "#f59e0b" },
  ]}
  min={0}
  max={100}
  width={300}
  height={180}
>
  <GaugeChart.Arc />
  <GaugeChart.Needle value={70} color="#111" />
  <GaugeChart.Label value={70} />
  <GaugeChart.Legend />
</GaugeChart.Container>`;
