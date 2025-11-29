import tailwindPostcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

const config = {
  framework: '@storybook/react-vite',
  stories: ['../stories/**/*.stories.@(ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-interactions',
  ],
  viteFinal: async (config) => {
    config.css = {
      postcss: {
        plugins: [tailwindPostcss(), autoprefixer()],
      },
    };
    config.esbuild = {
      jsx: 'automatic',
      jsxDev: true,
    };
    return config;
  },
};

export default config;
