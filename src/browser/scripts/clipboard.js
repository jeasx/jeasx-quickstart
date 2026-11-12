/* This file is an example. Feel free to delete it. */

document.querySelectorAll("[data-js-clipboard]").forEach((el) => {
  if (el instanceof HTMLElement) {
    el.addEventListener("click", (e) => {
      el.dataset.jsTitle ??= el.title;
      const title = el.dataset.jsTitle;
      const show = (state, text) => {
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
      };
      // navigator.clipboard is missing on insecure (http) origins.
      Promise.resolve()
        .then(() => navigator.clipboard.writeText(el.dataset.jsClipboard ?? ""))
        .then(() => show("copied", "Copied!"))
        .catch(() => show("failed", "Copying failed"));
    });
  }
});
