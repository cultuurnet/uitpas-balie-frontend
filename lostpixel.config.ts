import type { CustomProjectConfig } from 'lost-pixel';

export const config: CustomProjectConfig = {
  storybookShots: {
    storybookUrl: './storybook-static',
    elementLocator: '#storybook-root',
  },
  generateOnly: false,
  failOnDifference: true,
  threshold: 20,
};
