/* This file is an example. Feel free to delete it. */

import Layout from "./components/Layout";
import ServiceUnavailable from "./components/ServiceUnavailable";
import tryLoadRecipes from "./recipes";

// Sort order for the difficulty column.
const DIFFICULTIES = ["Easy", "Medium", "Hard"];

/**
 * @param {import("./types").RouteProps} props
 */
export default async function ({ request }) {
  const recipeData = await tryLoadRecipes();
  if (!recipeData) {
    return <ServiceUnavailable />;
  }

  const selectedCuisines = parseCuisines(request.query, recipeData.cuisines);
  const filteredRecipes = filterByCuisines(recipeData.recipes, selectedCuisines);
  const { title, description } = pageMeta(selectedCuisines);

  return (
    <Layout title={title} description={description}>
      <h1>{title}</h1>
      <p>Discover delicious recipes to cook at home.</p>
      <nav class="filters">
        {recipeData.cuisines.map((cuisine) => {
          const active = selectedCuisines.includes(cuisine);
          return (
            <a
              href={toggleHref(selectedCuisines, cuisine)}
              rel="nofollow"
              class={active ? "active" : undefined}
              title={active ? "Remove filter" : undefined}
            >
              {cuisine}
            </a>
          );
        })}
      </nav>
      {filteredRecipes.length ? (
        <div class="table-wrap">
          <table data-js-sort>
            <thead>
              <tr>
                <th>Image</th>
                <th data-js-sort>Name</th>
                <th data-js-sort>Cuisine</th>
                <th data-js-sort>Difficulty</th>
                <th data-js-sort>Minutes</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecipes.map(
                ({ id, name, cuisine, difficulty, image, totalMinutes, url }) => (
                  <tr>
                    <td>
                      <img
                        src={image}
                        alt=""
                        style={`view-transition-name: recipe-${id}`}
                        height="50"
                        width="50"
                        loading="lazy"
                      />
                    </td>
                    <td>
                      <a href={url} style={`view-transition-name: title-${id}`}>
                        {name}
                      </a>
                    </td>
                    <td>{cuisine}</td>
                    <td data-sort-value={DIFFICULTIES.indexOf(difficulty)}>{difficulty}</td>
                    <td data-sort-value={totalMinutes}>{totalMinutes} min</td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No recipes match the selected cuisines.</p>
      )}
    </Layout>
  );
}

/**
 * Selected cuisines from the query string, e.g. ?cuisine=Italian&cuisine=Thai.
 * Unknown values are dropped and duplicates removed.
 *
 * @param {unknown} query Fastify types the parsed query string as unknown.
 * @param {string[]} known
 * @returns {string[]}
 */
function parseCuisines(query, known) {
  const param = /** @type {Record<string, unknown>} */ (query ?? {})["cuisine"];
  const values = Array.isArray(param) ? param : [param];
  return [...new Set(values.filter((value) => typeof value === "string" && known.includes(value)))];
}

/**
 * Recipes matching any of the selected cuisines, or all recipes if none are selected.
 *
 * @param {import("./recipes").Recipe[]} recipes
 * @param {string[]} selected
 */
function filterByCuisines(recipes, selected) {
  return selected.length ? recipes.filter(({ cuisine }) => selected.includes(cuisine)) : recipes;
}

/**
 * Page title and meta description for the selected cuisines.
 *
 * @param {string[]} selected
 */
function pageMeta(selected) {
  const label = selected.join(", ");
  return {
    title: label ? `${label} Recipes` : "Recipes",
    description: label
      ? `Have fun cooking ${label.toLowerCase()} recipes`
      : "Have fun cooking recipes",
  };
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
