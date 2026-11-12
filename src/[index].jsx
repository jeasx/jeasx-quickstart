/* This file is an example. Feel free to delete it. */

import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/Layout";

/**
 * @param {import("./types").RouteProps} props
 */
export default function ({ request }) {
  // Multiple cuisines can be selected: ?cuisine=Italian&cuisine=Thai
  const cuisineParam = request.query["cuisine"];
  const selectedCuisines = (Array.isArray(cuisineParam) ? cuisineParam : [cuisineParam]).filter(
    (value) => typeof value === "string" && value !== "",
  );
  const cuisineLabel = selectedCuisines.join(", ");

  // The page is streamed: head and intro are sent right away,
  // the recipes follow as soon as they are loaded.
  return (
    <Layout
      title={`${cuisineLabel} Recipes`.trim()}
      description={`Have fun cooking ${cuisineLabel.toLowerCase()} recipes`}
    >
      <h1>{cuisineLabel} Recipes</h1>
      <p>Discover delicious recipes to cook at home.</p>
      {globalThis.$recipeCache ? (
        // Data is cached, so nothing can fail: stream directly.
        <Recipes selectedCuisines={selectedCuisines} />
      ) : (
        <ErrorBoundary fallback={<p>Recipes could not be loaded. Please try again later.</p>}>
          <Recipes selectedCuisines={selectedCuisines} />
        </ErrorBoundary>
      )}
    </Layout>
  );
}

/**
 * @param {{selectedCuisines: string[]}} props
 */
async function Recipes({ selectedCuisines }) {
  const { recipes, cuisines } = await loadRecipes();

  // Link that toggles the given cuisine in the current selection.
  const toggleHref = (/** @type {string} */ cuisine) => {
    const nextSelection = selectedCuisines.includes(cuisine)
      ? selectedCuisines.filter((selected) => selected !== cuisine)
      : [...selectedCuisines, cuisine];
    const params = new URLSearchParams(nextSelection.map((selected) => ["cuisine", selected]));
    return params.size ? `?${params}` : "?";
  };

  return (
    <>
      <div class="row wrap">
        <div class="col">
          {cuisines.map((cuisine) => (
            <a
              href={toggleHref(cuisine)}
              rel="nofollow"
              class={selectedCuisines.includes(cuisine) ? "active" : undefined}
              title={selectedCuisines.includes(cuisine) ? "Remove filter" : undefined}
            >
              {cuisine}
            </a>
          ))}
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Cuisine</th>
              <th>Difficulty</th>
              <th>Minutes</th>
            </tr>
          </thead>
          <tbody>
            {recipes
              .filter(
                ({ cuisine }) => !selectedCuisines.length || selectedCuisines.includes(cuisine),
              )
              .map(({ id, name, cuisine, difficulty, image, prepTimeMinutes, cookTimeMinutes }) => (
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
                    <a href={`${id}-${slugify(name)}`} style={`view-transition-name: title-${id}`}>
                      {name}
                    </a>
                  </td>
                  <td>{cuisine}</td>
                  <td>{difficulty}</td>
                  <td>{prepTimeMinutes + cookTimeMinutes} min</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

// Cache data in memory to avoid unnecessary API calls.
// Loaded on first request; a failed load is retried on the next request.
async function loadRecipes() {
  if (globalThis.$recipeCache) {
    return globalThis.$recipeCache;
  }
  const response = await fetch("https://dummyjson.com/recipes");
  if (!response.ok) {
    throw new Error(`Failed to load recipes: ${response.status}`);
  }
  const { recipes } = await response.json();
  return (globalThis.$recipeCache = {
    recipes,
    cuisines: [...new Set(recipes.map(({ cuisine }) => cuisine))].toSorted(),
  });
}

/**
 * @param {string} text
 */
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
