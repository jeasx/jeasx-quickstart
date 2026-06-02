/* This file is an example. Delete it at will. */

/**
 * @param {import("./types").RouteProps} props
 */
export default function ({ request, reply }) {
  // Provide request/reply via 'this' in components (e.g. Layout.jsx).
  this.request = request;
  this.reply = reply;
}
