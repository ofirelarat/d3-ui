
export const code = `import Treemap from "@/components/Treemap";

const data = {
  name: "root",
  children: [
    { name: "Electronics", value: 1500, color: "#3182bd" },
    { name: "Furniture", value: 900, color: "#6baed6" },
    {
      name: "Clothing",
      color: "red",
      children: [
        { name: "Men", value: 600, },
        { name: "Women", value: 800, },
      ],
    },
  ],
};

<Treemap.Container data={data} width={500} height={400}>
  <Treemap.Tile />
  <Treemap.Legend />
</Treemap.Container>
`;