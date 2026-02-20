// This file is an example. Delete it at will.

const NODE_ENV_IS_DEVELOPMENT = process.env.NODE_ENV === "development";

// https://www.jeasx.dev/configuration
export default {
  /** @type {() => import("esbuild").BuildOptions} */
  // ESBUILD_SERVER_OPTIONS: () => ({}),

  /** @type {() => import("esbuild").BuildOptions} */
  // ESBUILD_BROWSER_OPTIONS: () => ({
  //   target: ["chrome130", "edge130", "firefox130", "safari18"],
  // }),

  /** @type {(fastify: import("fastify").FastifyInstance) => import("fastify").FastifyInstance} */
  // FASTIFY_SERVER: (fastify) => fastify,

  /** @type {() => import("fastify").FastifyServerOptions} */
  FASTIFY_SERVER_OPTIONS: () => ({
    disableRequestLogging: NODE_ENV_IS_DEVELOPMENT,
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
