// This file is an example. Delete it at will.

const NODE_ENV_IS_DEVELOPMENT = process.env.NODE_ENV === "development";

// https://www.jeasx.dev/configuration
export default {
  /** @type import("esbuild").BuildOptions["target"] */
  //ESBUILD_BROWSER_TARGET: ["chrome130", "edge130", "firefox130", "safari18"],

  /** @type import("@mdx-js/esbuild").Options */
  // ESBUILD_MDX_OPTIONS: {},

  /** @type import("fastify").FastifyServerOptions */
  FASTIFY_SERVER_OPTIONS: {
    disableRequestLogging: NODE_ENV_IS_DEVELOPMENT,
    bodyLimit: 2 * 1024 * 1024
    // rewriteUrl: (req) => String(req.url).replace(/\.html(?=\?|$)/, ""),
  },

  /** @type import("@fastify/static").FastifyStaticOptions */
  FASTIFY_STATIC_OPTIONS: {
    maxAge: NODE_ENV_IS_DEVELOPMENT ? 0 : "365d"
  }

  /** @type import("@fastify/cookie").FastifyCookieOptions */
  // FASTIFY_COOKIE_OPTIONS: {},

  /** @type import("@fastify/formbody").FastifyFormbodyOptions */
  // FASTIFY_FORMBODY_OPTIONS: {},

  /** @type import("@fastify/multipart").FastifyMultipartOptions */
  // FASTIFY_MULTIPART_OPTIONS: {},
};
