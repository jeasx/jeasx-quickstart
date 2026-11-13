/* This file is an example. Feel free to delete it. */

/** @type {WeakMap<HTMLElement, number>} */
const timers = new WeakMap();

/**
 * Shows a temporary state ("copied" / "failed") on the button,
 * then restores its original title.
 *
 * @param {HTMLElement} el
 * @param {string} state
 * @param {string} text
 */
function show(el, state, text) {
  el.dataset.jsTitle ??= el.title;
  const title = el.dataset.jsTitle;
  el.classList.remove("copied", "failed");
  el.classList.add(state);
  el.title = text;
  el.ariaLabel = text;
  window.clearTimeout(timers.get(el));
  timers.set(
    el,
    window.setTimeout(() => {
      el.classList.remove(state);
      el.title = title;
      el.ariaLabel = title;
    }, 2000),
  );
}

document.querySelectorAll("[data-js-clipboard]").forEach((el) => {
  if (el instanceof HTMLElement) {
    el.addEventListener("click", async () => {
      try {
        // navigator.clipboard is missing on insecure (http) origins, which throws here.
        await navigator.clipboard.writeText(el.dataset.jsClipboard ?? "");
        show(el, "copied", "Copied!");
      } catch {
        show(el, "failed", "Copying failed");
      }
    });
  }
});
