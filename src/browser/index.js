/* This file is an example. Delete it at will. */

document.querySelectorAll("[data-js-clipboard]").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(el.getAttribute("data-js-clipboard"));
  });
});

document.querySelectorAll("[data-js-back]").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    history.back();
  });
});
