/* This file is an example. Feel free to delete it. */

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
  clearTimeout(Number(el.dataset.jsTimer));
  el.dataset.jsTimer = String(
    setTimeout(() => {
      el.classList.remove(state);
      el.title = title;
    }, 2000),
  );
}

document.querySelectorAll("[data-js-clipboard]").forEach((el) => {
  if (el instanceof HTMLElement) {
    el.addEventListener("click", () => {
      // navigator.clipboard is missing on insecure (http) origins.
      Promise.resolve()
        .then(() => navigator.clipboard.writeText(el.dataset.jsClipboard ?? ""))
        .then(() => show(el, "copied", "Copied!"))
        .catch(() => show(el, "failed", "Copying failed"));
    });
  }
});
