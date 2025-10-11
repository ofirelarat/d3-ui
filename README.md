# D3-UI: Beautiful React Chart Components

[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![D3.js](https://img.shields.io/badge/D3.js-7-orange.svg)](https://d3js.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Re-usable React chart components built with D3.js and Tailwind CSS. Copy and paste into your projects.

## ✨ Why D3-UI?

D3.js is incredibly powerful but comes with a steep learning curve. D3-UI provides accessible, re-usable chart components that you can copy directly into your React projects:

- **Copy and Paste**: Just like shadcn/ui, grab the components you need
- **Simplifying Complex D3.js Logic**: No need to understand D3.js internals
- **React-First Approach**: Use familiar React patterns and props
- **Zero D3.js Knowledge Required**: Just pass your data and go
- **Type-Safe**: Full TypeScript support for better development experience
- **Modern Styling**: Clean, modern design with Tailwind CSS
- **Interactive Out-of-the-Box**: Built-in tooltips and hover states

## 📦 Installation

1. Clone and copy the components you need into your project
2. Install the required dependencies:

```bash
npm install d3 @types/d3
```

## Usage

```tsx
import { LineChart } from '@/components/charts';

const MyChart = () => {
  const data = [
    { x: 0, y: 10 },
    { x: 1, y: 30 },
    { x: 2, y: 20 },
  ];

  return <LineChart data={data} />;
};
```

## 📊 Available Charts

### Line Chart
Perfect for time series and trends
```tsx
<LineChart
  data={data}
  width={400}
  height={200}
  color="#3b82f6"
/>
```

### Scatter Plot
Ideal for correlation analysis
```tsx
<ScatterPlot
  data={data}
  width={400}
  height={400}
/>
```

### Heat Map
Great for density visualization
```tsx
<HeatMap
  data={matrixData}
  width={500}
  height={500}
/>
```

## 🎯 Components

### Line Chart
```tsx
import { LineChart } from '@/components/charts';

// Copy the LineChart.tsx and its dependencies
// from components/LineChart.tsx
```

### Scatter Plot
```tsx
import { ScatterPlot } from '@/components/charts';

// Copy the ScatterPlot.tsx and its dependencies
// from components/ScatterPlot.tsx
```

### Heat Map
```tsx
import { HeatMap } from '@/components/charts';

// Copy the HeatMap.tsx and its dependencies
// from components/HeatMap.tsx
```

## 🎨 Features

- **Simple Props API**: Intuitive props for customization
- **Responsive by Default**: Charts that adapt to their container
- **Interactive Elements**: 
  - Smart tooltips with consistent styling
  - Hover effects
  - Dark mode support
- **Accessibility Built-in**: ARIA labels and keyboard navigation
- **Tailwind Styled**: Consistent with your design system
- **TypeScript Ready**: Full type definitions included

## 📚 Documentation

Visit our [documentation site](https://d3-ui.vercel.app) for:
- Live examples
- Component API
- Installation guides
- Customization examples

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/ofirelarat/d3-ui.git

# Install dependencies
npm install

# Start the documentation site
npm run dev
```

## 🤝 Contributing

We welcome contributions! Whether it's:
- Adding new chart components
- Improving documentation
- Fixing bugs
- Suggesting features

## 📝 License

MIT © [Ofir Elarat](LICENSE)

---

<p align="center">Built with D3.js and Tailwind CSS for the React community ❤️</p>
