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

  // You can override #jsxToString() via 'this' context.
  // This allows you to modify or replace JSX components.
  // See example in <https://github.com/jeasx/jsx-async-runtime>
  /*  
    import { jsxToString } from "jsx-async-runtime";
    ...
    this.jsxToString = (jsxElement) => {
      console.log(JSON.stringify(jsxElement, null, 2));
      return jsxToString.call(this, jsxElement)
    }
  */
}
