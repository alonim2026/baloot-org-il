import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://baloot.org.il',
  output: 'static',       // Cloudflare Pages – static build
  integrations: [
    mdx(),
    sitemap(),
  ],
  i18n: {
    defaultLocale: 'he',
    locales: ['he', 'en'],
  },
  markdown: {
    shikiConfig: { theme: 'github-light' },
  },
});
