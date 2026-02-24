import type { Preview } from "@storybook/react";
import "../src/index.css";

/**
 * Global Storybook preview: applies library Tailwind styles to all stories.
 */
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
