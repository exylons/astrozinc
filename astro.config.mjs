import { defineConfig, sharpImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import { readFileSync } from "node:fs";
import icon from "astro-icon";
import expressiveCode from "astro-expressive-code";
import mdx from '@astrojs/mdx';

/** @type {import('astro-expressive-code').AstroExpressiveCodeOptions} */
const astroExpressiveCodeOptions = {
  themes: ["min-dark", "min-light"],
};

export default defineConfig({
  integrations: [
    tailwind(),
    sitemap(),
    expressiveCode(astroExpressiveCodeOptions),
    icon(),
    mdx(),
  ],
  image: {
    service: sharpImageService(),
  },
  site: "https://astrozinc.exylons.com",
  vite: {
    plugins: [rawFonts([".ttf", ".woff"])],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
});

// vite plugin to import fonts
function rawFonts(ext) {
  return {
    name: "vite-plugin-raw-fonts",
    transform(_, id) {
      if (ext.some((e) => id.endsWith(e))) {
        const buffer = readFileSync(id);
        return {
          code: `export default ${JSON.stringify(buffer)}`,
          map: null,
        };
      }
    },
  };
}
