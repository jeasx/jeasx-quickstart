// https://www.jeasx.dev/configuration
//
// This file provides sensible defaults for various options.
// Feel free to customize them to suit your project's needs.

import querystring from "node:querystring";

export default {
  /** @type {() => import("esbuild").BuildOptions} */
  ESBUILD_SERVER_OPTIONS: () => ({
    // Load SVG files as strings (see `src/loader.d.ts`).
    loader: { ".svg": "text" },
    // Create sourcemaps for debugging only in development.
    sourcemap: process.env.NODE_ENV === "development" && "inline",
  }),

  /** @type {() => import("esbuild").BuildOptions} */
  ESBUILD_BROWSER_OPTIONS: () => ({
    // Hash filenames based on their content (see `src/browser/index.css`).
    loader: { ".woff2": "file" },
    // Target environment for the generated JavaScript / CSS code.
    target: ["chrome130", "edge130", "firefox130", "safari18"],
  }),

  /** @type {(fastify: import("fastify").FastifyInstance) => import("fastify").FastifyInstance} */
  FASTIFY_SERVER: (fastify) =>
    // Required only if you want to process form submissions via POST requests.
    fastify.addContentTypeParser(
      "application/x-www-form-urlencoded",
      { parseAs: "string" },
      async (_request, body) => querystring.parse(body),
    ),

  /** @type {() => import("fastify").FastifyServerOptions} */
  FASTIFY_SERVER_OPTIONS: () => ({
    // Skip request logging in development.
    logger: { level: process.env.NODE_ENV === "development" ? "error" : "info" },
  }),

  /** @type {() => import("@fastify/send").SendOptions} */
  FASTIFY_SEND_OPTIONS: () => ({
    // Generate caching headers for static files.
    maxAge: process.env.NODE_ENV === "development" ? 0 : "365d",
  }),
};
