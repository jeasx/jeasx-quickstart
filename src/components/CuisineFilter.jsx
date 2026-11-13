/* This file is an example. Feel free to delete it. */

/**
 * Links to toggle cuisine filters on and off.
 *
 * @param {{ cuisines: string[], selected: string[] }} props
 */
export default function CuisineFilter({ cuisines, selected }) {
  return (
    <nav class="filters">
      {cuisines.map((cuisine) => {
        const active = selected.includes(cuisine);
        return (
          <a
            href={toggleHref(selected, cuisine)}
            rel="nofollow"
            class={active ? "active" : undefined}
            aria-current={active ? "true" : undefined}
            title={active ? "Remove filter" : undefined}
          >
            {cuisine}
          </a>
        );
      })}
    </nav>
  );
}

/**
 * Link that adds or removes the given cuisine from the current selection.
 *
 * @param {string[]} selected
 * @param {string} cuisine
 */
function toggleHref(selected, cuisine) {
  const next = selected.includes(cuisine)
    ? selected.filter((other) => other !== cuisine)
    : [...selected, cuisine];
  const params = new URLSearchParams(next.map((value) => ["cuisine", value]));
  return params.size ? `/?${params}` : "/";
}
