/* This file is an example. Feel free to delete it. */

/**
 * @param {import("./types").RouteProps} props
 */
export default function ({ request, reply }) {
  // Guards run before every route in this directory and below.
  // Provide request/reply via 'this' in components (e.g. Layout.jsx).
  this.request = request;
  this.reply = reply;
}
