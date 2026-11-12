/* This file is an example. Feel free to delete it. */

// Go back in history only if the previous page is on this site,
// otherwise follow the link (e.g. when opened from a search result).
const cameFromSite = (() => {
  try {
    return history.length > 1 && new URL(document.referrer).origin === location.origin;
  } catch {
    return false;
  }
})();

document.querySelectorAll("[data-js-back]").forEach((el) => {
  if (el instanceof HTMLElement && cameFromSite) {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      history.back();
    });
  }
});
