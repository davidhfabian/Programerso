import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    icon({
      include: {
        tabler: [
          'arrow-left',
          'arrow-right',
          'books',
          'brand-javascript',
          'brand-python',
          'bulb',
          'chevron-right',
          'clock',
          'cursor-text',
          'device-laptop',
          'keyboard',
          'moon',
          'player-play',
          'sun',
        ],
      },
    }),
  ],
});
