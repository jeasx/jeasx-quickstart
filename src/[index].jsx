/* This file is an example. Feel free to delete it. */

import Layout from "./components/Layout";
import ServiceUnavailable from "./components/ServiceUnavailable";
import tryLoadRecipes from "./recipes";

// Sort order for the difficulty column.
const DIFFICULTIES = ["Easy", "Medium", "Hard"];

// Limit selectable cuisines, so huge query strings can't blow up the page.
const MAX_CUISINES = 20;

/**
 * @param {import("./types").RouteProps} props
 */
export default async function ({ request }) {
  const data = await tryLoadRecipes();
  if (!data) {
    return <ServiceUnavailable />;
  }

  // Multiple cuisines can be selected: ?cuisine=Italian&cuisine=Thai
  const cuisineParam = request.query["cuisine"];
  // Deduplicate, so "?cuisine=Thai&cuisine=Thai" is treated like "?cuisine=Thai".
  const selectedCuisines = [
    ...new Set(
      (Array.isArray(cuisineParam) ? cuisineParam : [cuisineParam]).filter(
        (value) => typeof value === "string" && value !== "",
      ),
    ),
  ].slice(0, MAX_CUISINES);
  const selected = new Set(selectedCuisines);

  // Link that toggles the given cuisine in the current selection.
  const toggleHref = (/** @type {string} */ cuisine) => {
    const nextSelection = selected.has(cuisine)
      ? selectedCuisines.filter((other) => other !== cuisine)
      : [...selectedCuisines, cuisine];
    const params = new URLSearchParams(nextSelection.map((value) => ["cuisine", value]));
    return params.size ? `/?${params}` : "/";
  };

  const filteredRecipes = data.recipes.filter(
    ({ cuisine }) => !selected.size || selected.has(cuisine),
  );

  const cuisineLabel = selectedCuisines.join(", ");
  const title = `${cuisineLabel} Recipes`.trim();

  return (
    <Layout
      title={title}
      description={["Have fun cooking", cuisineLabel.toLowerCase(), "recipes"]
        .filter(Boolean)
        .join(" ")}
    >
      <h1>{title}</h1>
      <p>Discover delicious recipes to cook at home.</p>
      <div class="row wrap">
        <div class="col">
          {/* Include unknown selected cuisines, so they can be removed again. */}
          {[...new Set([...data.cuisines, ...selectedCuisines])].map((cuisine) => {
            const active = selected.has(cuisine);
            return (
              <a
                href={toggleHref(cuisine)}
                rel="nofollow"
                class={active ? "active" : undefined}
                title={active ? "Remove filter" : undefined}
              >
                {cuisine}
              </a>
            );
          })}
        </div>
      </div>
      {!filteredRecipes.length ? (
        <p>No recipes match the selected cuisines.</p>
      ) : (
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
                ({ name, cuisine, difficulty, image, totalMinutes, url, transitions }) => (
                  <tr>
                    <td>
                      <img
                        src={image}
                        alt=""
                        style={transitions.image}
                        height="50"
                        width="50"
                        loading="lazy"
                      />
                    </td>
                    <td>
                      <a href={url} style={transitions.title}>
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
      )}
    </Layout>
  );
}
