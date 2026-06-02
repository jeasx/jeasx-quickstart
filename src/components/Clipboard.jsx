/* This file is an example. Delete it at will. */

/**
 * @param {{list: string[]}} props
 */
export default function ({ list }) {
  return (
    <button type="button" data-js-clipboard={list.join("\n")}>
      Copy to clipboard
    </button>
  );
}
