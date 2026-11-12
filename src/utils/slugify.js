/* This file is an example. Feel free to delete it. */

/**
 * @param {string} text
 */
export default function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
