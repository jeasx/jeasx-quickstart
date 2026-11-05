/* This file is an example. Feel free to delete it. */

import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/Layout";

// Cache data in memory to avoid unnecessary API calls.
// Loaded on first request; a failed load is retried on the next request.
let cache;

async function loadRecipes() {
  cache ??= fetch("https://dummyjson.com/recipes")
    .then((response) => {
      if (!response.ok) throw new Error(`Failed to load recipes: ${response.status}`);
      return response.json();
    })
    .then(({ recipes }) => ({
      recipes,
      cuisines: [...new Set(recipes.map(({ cuisine }) => cuisine))].toSorted(),
    }))
    .catch((error) => {
      cache = undefined;
      throw error;
    });
  return cache;
}

/**
 * @param {import("./types").RouteProps} props
 */
export default function ({ request }) {
  // Multiple cuisines can be selected: ?cuisine=Italian&cuisine=Thai
  const query = request.query["cuisine"];
  const $cuisines = (Array.isArray(query) ? query : [query]).filter(
    (value) => typeof value === "string" && value !== "",
  );
  const $cuisine = $cuisines.join(", ");

  // The page is streamed: head and intro are sent right away,
  // the recipes follow as soon as they are loaded.
  return (
    <Layout
      title={`${$cuisine} Recipes`.trim()}
      description={`Have fun cooking ${$cuisine.toLowerCase()} recipes`}
    >
      <h1>{$cuisine} Recipes</h1>
      <p>Discover delicious recipes to cook at home.</p>
      <ErrorBoundary fallback={<p>Recipes could not be loaded. Please try again later.</p>}>
        <Recipes cuisines={$cuisines} />
      </ErrorBoundary>
    </Layout>
  );
}

/**
 * @param {{cuisines: string[]}} props
 */
async function Recipes({ cuisines: $cuisines }) {
  const { recipes, cuisines } = await loadRecipes();

  // Link that toggles the given cuisine in the current selection.
  const toggleHref = (/** @type {string} */ cuisine) => {
    const selection = $cuisines.includes(cuisine)
      ? $cuisines.filter((selected) => selected !== cuisine)
      : [...$cuisines, cuisine];
    const params = new URLSearchParams(selection.map((selected) => ["cuisine", selected]));
    return params.size ? `?${params}` : "?";
  };

  return (
    <>
      <div class="row wrap">
        <div class="col">
          {cuisines.map((cuisine) => (
            <>
              <a
                href={toggleHref(cuisine)}
                class={$cuisines.includes(cuisine) ? "active" : undefined}
                title={$cuisines.includes(cuisine) ? "Remove filter" : undefined}
              >
                {cuisine}
              </a>{" "}
            </>
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
            .filter(({ cuisine }) => !$cuisines.length || $cuisines.includes(cuisine))
            .map(({ id, name, cuisine, difficulty, image, prepTimeMinutes, cookTimeMinutes }) => (
              <tr>
                <td>
                  <img src={image} alt="" style={`view-transition-name: recipe-${id}`} height="50" width="50" loading="lazy" />
                </td>
                <td>
                  <a href={`${id}-${slugify(name)}`} style={`view-transition-name: title-${id}`}>{name}</a>
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

/**
 * @param {string} str
 */
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
