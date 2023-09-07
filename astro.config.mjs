import { defineConfig } from 'astro/config';

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: 'https://team-hugh-laurie.github.io',
  integrations: [svelte()]
});