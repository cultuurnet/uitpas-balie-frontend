import type { CustomProjectConfig } from 'lost-pixel';

export const config: CustomProjectConfig = {
  storybookShots: {
    storybookUrl: './storybook-static',
    elementLocator: '#storybook-root',
  },
  generateOnly: true,
  failOnDifference: true,
  threshold: 20,
};
