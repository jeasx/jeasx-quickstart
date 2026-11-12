/* This file is an example. Feel free to delete it. */

document.querySelectorAll("[data-js-back]").forEach((el) => {
  if (el instanceof HTMLElement) {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      history.back();
    });
  }
});
