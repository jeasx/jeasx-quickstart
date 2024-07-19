/* This file is an example. Delete it at will. */


/**
 * @param {import("./types").RouteProps} props
 */
export default function RootGuard({ request, reply }) {
  // Provide request/reply via this context.
  this.request = request
  this.reply = reply;

  // Set optional response handler in request context.
  // Below is an example of how to prettify resulting HTML.
  /*
  import * as prettier from "prettier";
  ...
  this.response = async (payload) => {
    return typeof payload === "string" &&
      String(reply.getHeader("content-type")).startsWith("text/html")
      ? await prettier.format(payload, { parser: "html" })
      : payload;
  };
  */
}
