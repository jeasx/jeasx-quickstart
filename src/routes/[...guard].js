/**
 * @param {import("./types").RouteProps} props
 */
export default function RootGuard({ request, reply }) {
  this.request = request;
  this.reply = reply;
}
