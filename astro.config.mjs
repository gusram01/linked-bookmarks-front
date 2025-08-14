import { defineConfig, envField } from 'astro/config';
import node from '@astrojs/node';
import clerk from '@clerk/astro';

import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [clerk({
    afterSignInUrl: '/bookmarks/new',
    afterSignUpUrl: '/bookmarks/new'
  }), tailwind()],
  env: {
    schema: {
      WEB_API_BASE_URL: envField.string({ context: "server", access: "secret", default: "http://localhost:8000" }),
    }
  }
});