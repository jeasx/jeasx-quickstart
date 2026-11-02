/* This file is an example. Feel free to delete it. */

import { html, jsxToString } from "jsx-async-runtime";

/**
 * Renders its children to a string first, so an error in an async child
 * shows the fallback instead of cutting off the streamed page.
 *
 * @this {import("../types").ThisContext}
 * @param {{fallback: JSX.Element, children: JSX.Element}} props
 */
export default async function ErrorBoundary({ fallback, children }) {
  try {
    return html(await jsxToString.call(this, children));
  } catch (error) {
    this.request.log.error(error);
    return fallback;
  }
}
