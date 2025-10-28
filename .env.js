// This file is an example. Delete it at will.

const NODE_ENV_IS_DEVELOPMENT = process.env.NODE_ENV === "development";

export default {
  FASTIFY_DISABLE_REQUEST_LOGGING: NODE_ENV_IS_DEVELOPMENT,
  // FASTIFY_REWRITE_URL: (/** @type import("fastify").FastifyRequest */ req) =>
  //   req.url.replace(/^\/jeasx/, ""),
  // FASTIFY_STATIC_HEADERS: NODE_ENV_IS_DEVELOPMENT
  //   ? {
  //       "": { "Cache-Control": "public,max-age=60" },
  //       ".js": { "Cache-Control": "no-store" },
  //       ".css": { "Cache-Control": "no-store" },
  //     }
  //   : { "": { "Cache-Control": "public,max-age=31536000,s-maxage=31536000" } },
};
