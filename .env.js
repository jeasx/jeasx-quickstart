// This file is an example. Delete it at will.
//
// To edit .env.js as a JavaScript file,
// you'll need to extend your editor settings:
//
// VSCode:
//  "files.associations": {".env.js": "javascript"}
//
// Zed:
//  "file_types": {"JavaScript": [".env.js"]}

const NODE_ENV_IS_DEVELOPMENT = process.env.NODE_ENV === "development";

// https://www.jeasx.dev/configuration
export default {
  /** @type {() => import("esbuild").BuildOptions} */
  ESBUILD_SERVER_OPTIONS: () => ({
    // The file loader returns a hashed file path
    // when resource is imported in JavaScript.
    loader: { ".svg": "file" },
  }),

  /** @type {() => import("esbuild").BuildOptions} */
  ESBUILD_BROWSER_OPTIONS: () => ({
    // Mark files as external, which are linked in JS or CSS,
    // but should be ignored by esbuild.
    external: ["*.woff2"],
    // Defaults to "esnext"
    target: ["chrome130", "edge130", "firefox130", "safari18"],
  }),

  /** @type {(fastify: import("fastify").FastifyInstance) => import("fastify").FastifyInstance} */
  // FASTIFY_SERVER: (fastify) => fastify,

  /** @type {() => import("fastify").FastifyServerOptions} */
  FASTIFY_SERVER_OPTIONS: () => ({
    logger: { level: NODE_ENV_IS_DEVELOPMENT ? "error" : "info" },
  }),

  /** @type {() => import("@fastify/static").FastifyStaticOptions} */
  FASTIFY_STATIC_OPTIONS: () => ({
    maxAge: NODE_ENV_IS_DEVELOPMENT ? 0 : "365d",
  }),

  /** @type {() => import("@fastify/cookie").FastifyCookieOptions} */
  // FASTIFY_COOKIE_OPTIONS: () => ({}),

  /** @type {() => import("@fastify/formbody").FastifyFormbodyOptions} */
  // FASTIFY_FORMBODY_OPTIONS: () => ({}),

  /** @type {() => import("@fastify/multipart").FastifyMultipartOptions} */
  // FASTIFY_MULTIPART_OPTIONS: () => ({}),
};
