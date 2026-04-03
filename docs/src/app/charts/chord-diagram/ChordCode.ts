export const code = `import ChordDiagram from "@/components/ChordDiagram";
import { ChordData } from "@/components/types";

const DATA: ChordData = [
  {
    label: "Group A",
    ribbons: [
      { label: "Group B", sourceValue: 10, targetValue: 5 },
    ],
  },
  {
    label: "Group B",
    ribbons: [],
  },
];

export const App = () => (
  <ChordDiagram.Container 
    data={DATA} 
    width={600} 
    height={600} 
    directed={false}
  >
    <ChordDiagram.Ribbons />
    <ChordDiagram.Groups />
    <ChordDiagram.Legend />
  </ChordDiagram.Container>
);`;
