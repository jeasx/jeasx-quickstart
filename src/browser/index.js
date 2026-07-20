/* This file is an example. Delete it at will. */

document.querySelectorAll("[data-js-clipboard]").forEach((el) => {
  if (el instanceof HTMLElement) {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      if (confirm(`${el.title}?`)) {
        navigator.clipboard.writeText(el.dataset.jsClipboard);
      }
    });
  }
});

document.querySelectorAll("[data-js-back]").forEach((el) => {
  if (el instanceof HTMLElement) {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      history.back();
    });
  }
});
