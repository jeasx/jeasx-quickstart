/* This file is an example. Feel free to delete it. */

/**
 * Links to select a single cuisine filter or clear it.
 *
 * @param {{ cuisines: string[], selected: string | undefined }} props
 */
export default function CuisineFilter({ cuisines, selected }) {
  return (
    <nav class="filters">
      {cuisines.map((cuisine) => {
        const active = selected === cuisine;
        return (
          <a
            href={active ? "/" : `/?${new URLSearchParams({ cuisine })}`}
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

