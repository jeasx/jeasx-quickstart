/* This file is an example. Delete it at will. */

import { requestContext } from "@fastify/request-context";

/**
 * @param {import("./types").RouteProps} props
 */
export default function RootGuard({ request, reply }) {
  // Set the request and reply objects in the request context
  requestContext.set("request", request);
  requestContext.set("reply", reply);

  // Set optional response handler in request context.
  // Below is an example of how to prettify resulting HTML.
  /*
  import * as prettier from "prettier";
  ...
  requestContext.set("response", async (payload) => {
    return typeof payload === "string" &&
      String(reply.getHeader("content-type")).startsWith("text/html")
      ? await prettier.format(payload, { parser: "html" })
      : payload;
  });
  */
}
