/* This file is an example. Feel free to delete it. */

// Makes columns of <table data-js-sort> sortable. Mark sortable headers with
// <th data-js-sort>; cells can provide a sort key via data-sort-value.
// Integers are compared as numbers, everything else as text.
const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });

document.querySelectorAll("table[data-js-sort]").forEach((table) => {
  if (!(table instanceof HTMLTableElement)) {
    return;
  }
  const tbody = table.tBodies[0];
  const headers = [...table.querySelectorAll("thead th[data-js-sort]")];

  headers.forEach((th) => {
    if (!(th instanceof HTMLTableCellElement)) {
      return;
    }
    // Wrap the header text in a button, so it is reachable by keyboard.
    const button = document.createElement("button");
    button.type = "button";
    button.append(...th.childNodes);
    th.append(button);

    button.addEventListener("click", () => {
      const direction = th.getAttribute("aria-sort") === "ascending" ? "descending" : "ascending";
      headers.forEach((other) => other.removeAttribute("aria-sort"));
      th.setAttribute("aria-sort", direction);

      const factor = direction === "ascending" ? 1 : -1;
      const value = (/** @type {HTMLTableRowElement} */ row) => {
        const cell = row.cells[th.cellIndex];
        return cell.dataset.sortValue ?? cell.textContent?.trim() ?? "";
      };
      const rows = [...tbody.rows].sort((a, b) => factor * collator.compare(value(a), value(b)));
      tbody.append(...rows);
    });
  });
});
