/* This file is an example. Feel free to delete it. */

import { html } from "jsx-async-runtime";
import Clipboard from "./Clipboard.svg";

/**
 * @param {{title:string, list: string[]}} props
 */
export default function ({ title, list }) {
  return (
    <button type="button" data-js-clipboard={list.join("\n")} title={title}>
      {html(Clipboard)}
    </button>
  );
}
