/* This file is an example. Delete it at will. */

document.querySelectorAll("[data-js-clipboard]").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    if (confirm("Copy to clipboard?")) {
      navigator.clipboard.writeText(el.getAttribute("data-js-clipboard"));
    }
  });
});

document.querySelectorAll("[data-js-back]").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    history.back();
  });
});
