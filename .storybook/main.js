const config = {
  framework: '@storybook/react-vite',
  stories: ['../stories/**/*.stories.@(ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  viteFinal: async (config) => {
    config.esbuild = {
      jsx: 'automatic',
      jsxDev: true,
    };
    return config;
  },
};

export default config;
