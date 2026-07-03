// https://www.jeasx.dev/configuration

export default {
  /** @type {() => import("esbuild").BuildOptions} */
  // ESBUILD_SERVER_OPTIONS: () => ({}),

  /** @type {() => import("esbuild").BuildOptions} */
  ESBUILD_BROWSER_OPTIONS: () => ({
    loader: { ".woff2": "file" },
    target: ["chrome130", "edge130", "firefox130", "safari18"],
  }),

  /** @type {(fastify: import("fastify").FastifyInstance) => import("fastify").FastifyInstance} */
  // FASTIFY_SERVER: (fastify) => fastify,

  /** @type {() => import("fastify").FastifyServerOptions} */
  FASTIFY_SERVER_OPTIONS: () => ({
    logger: { level: process.env.NODE_ENV === "development" ? "error" : "info" },
  }),

  /** @type {() => import("@fastify/send").SendOptions} */
  FASTIFY_SEND_OPTIONS: () => ({
    maxAge: process.env.NODE_ENV === "development" ? 0 : "365d",
  }),

  /** @type {() => import("@fastify/cookie").FastifyCookieOptions} */
  // FASTIFY_COOKIE_OPTIONS: () => ({}),

  /** @type {() => import("@fastify/formbody").FastifyFormbodyOptions} */
  // FASTIFY_FORMBODY_OPTIONS: () => ({}),

  /** @type {() => import("@fastify/multipart").FastifyMultipartOptions} */
  // FASTIFY_MULTIPART_OPTIONS: () => ({}),
};
