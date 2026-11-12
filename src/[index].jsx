/* This file is an example. Feel free to delete it. */

import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/Layout";
import { loadRecipes, recipesLoaded } from "./utils/recipes";
import slugify from "./utils/slugify";

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
      description={["Have fun cooking", cuisineLabel.toLowerCase(), "recipes"]
        .filter(Boolean)
        .join(" ")}
    >
      <h1>{cuisineLabel} Recipes</h1>
      <p>Discover delicious recipes to cook at home.</p>
      {recipesLoaded() ? (
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

const DIFFICULTY_ORDER = ["Easy", "Medium", "Hard"];

// Unknown difficulties sort last (the numeric collator ignores a minus sign).
const difficultyRank = (/** @type {string} */ difficulty) => {
  const rank = DIFFICULTY_ORDER.indexOf(difficulty);
  return rank === -1 ? DIFFICULTY_ORDER.length : rank;
};

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
    return params.size ? `/?${params}` : "/";
  };

  const filteredRecipes = recipes.filter(
    ({ cuisine }) => !selectedCuisines.length || selectedCuisines.includes(cuisine),
  );

  return (
    <>
      <div class="row wrap">
        <div class="col">
          {/* Include unknown selected cuisines, so they can be removed again. */}
          {[...new Set([...cuisines, ...selectedCuisines])].map((cuisine) => (
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
      {!filteredRecipes.length && <p>No recipes match the selected cuisines.</p>}
      <div class="table-wrap" hidden={!filteredRecipes.length}>
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
              ({ id, name, cuisine, difficulty, image, prepTimeMinutes, cookTimeMinutes }) => (
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
                    <a href={`/${id}-${slugify(name)}`} style={`view-transition-name: title-${id}`}>
                      {name}
                    </a>
                  </td>
                  <td>{cuisine}</td>
                  <td data-sort-value={difficultyRank(difficulty)}>{difficulty}</td>
                  <td data-sort-value={prepTimeMinutes + cookTimeMinutes}>
                    {prepTimeMinutes + cookTimeMinutes} min
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
