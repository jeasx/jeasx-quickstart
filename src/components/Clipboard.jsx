/* This file is an example. Delete it at will. */

import ClipboardIcon from "./clipboard.svg";

/**
 * @param {{list: string[]}} props
 */
export default function ({ list }) {
  return (
    <button type="button" data-js-clipboard={list.join("\n")}>
      <img src={ClipboardIcon} width="18" height="18" alt="Clipboard" title="Copy to clipboard" />
    </button>
  );
}
