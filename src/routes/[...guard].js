/* This file is an example. Delete it at will. */

import { requestContext } from "@fastify/request-context";

/**
 * @param {import("./types").RouteProps} props
 */
export default function RootGuard({ request, reply }) {
  // Set the request and reply objects in the request context
  requestContext.set("request", request);
  requestContext.set("reply", reply);
}
