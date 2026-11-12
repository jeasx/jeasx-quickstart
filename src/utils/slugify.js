/* This file is an example. Feel free to delete it. */

/**
 * @param {string} text
 */
export default function slugify(text) {
  return text
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/\W+/g, "-")
    .replace(/^-+|-+$/g, "");
}
