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
  const query = request.query["cuisine"];
  const $cuisine = typeof query === "string" ? query : "";

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
        <Recipes cuisine={$cuisine} />
      </ErrorBoundary>
    </Layout>
  );
}

/**
 * @param {{cuisine: string}} props
 */
async function Recipes({ cuisine: $cuisine }) {
  const { recipes, cuisines } = await loadRecipes();

  return (
    <>
      <div class="row wrap">
        <div class="col">
          {cuisines.map((cuisine) => (
            <>
              <a
                href={cuisine !== $cuisine ? `?cuisine=${encodeURIComponent(cuisine)}` : ""}
                class={cuisine === $cuisine ? "active" : undefined}
                title={cuisine === $cuisine ? "Remove filter" : undefined}
              >
                {cuisine}
              </a>{" "}
            </>
          ))}
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Cuisine</th>
            <th>Difficulty</th>
            <th>Minutes</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {recipes
            .filter(({ cuisine }) => !$cuisine || $cuisine === cuisine)
            .map(({ id, name, cuisine, difficulty, image, prepTimeMinutes, cookTimeMinutes }) => (
              <tr>
                <td>
                  <a href={`${id}-${slugify(name)}`} style={`view-transition-name: title-${id}`}>{name}</a>
                </td>
                <td>{cuisine}</td>
                <td>{difficulty}</td>
                <td>{prepTimeMinutes + cookTimeMinutes} min</td>
                <td>
                  <img src={image} alt="" style={`view-transition-name: recipe-${id}`} height="50" width="50" loading="lazy" />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
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
