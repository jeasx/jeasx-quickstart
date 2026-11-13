/* This file is an example. Feel free to delete it. */

/**
 * @typedef {{
 *   id: number,
 *   name: string,
 *   cuisine: string,
 *   difficulty: string,
 *   image: string,
 *   ingredients: string[],
 *   instructions: string[],
 *   prepTimeMinutes: number,
 *   cookTimeMinutes: number,
 *   totalMinutes: number,
 *   url: string,
 * }} Recipe
 *
 * @typedef {{
 *   recipes: Recipe[],
 *   recipesById: Map<number, Recipe>,
 *   cuisines: string[],
 * }} RecipeData
 */

/**
 * Loads recipes, logs a failure and returns null instead of throwing.
 * Routes should call this before rendering, so a failure can still be
 * answered with a proper status code (it can't be changed once streaming started).
 *
 * Data is cached in memory to avoid unnecessary API calls.
 * Loaded on first request; concurrent requests share the pending load,
 * a failed load is retried on the next request.
 *
 * Stored on globalThis (not in module variables),
 * because every route is bundled separately and
 * gets its own copy of this module.
 *
 * @returns {Promise<RecipeData | null>}
 */
export default async function tryLoadRecipes() {
  try {
    if (globalThis.$recipes) {
      return globalThis.$recipes;
    }
    globalThis.$recipesPending ??= fetchRecipes()
      .then((data) => (globalThis.$recipes = data))
      .finally(() => (globalThis.$recipesPending = undefined));
    return await globalThis.$recipesPending;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/** @returns {Promise<RecipeData>} */
async function fetchRecipes() {
  const response = await fetch("https://dummyjson.com/recipes?limit=0", {
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) {
    throw new Error(`Failed to load recipes: ${response.status}`);
  }
  /** @type {{ recipes: Omit<Recipe, "totalMinutes" | "url">[] }} */
  const json = await response.json();
  // Compute derived values once, so routes don't have to.
  const recipes = json.recipes.map((recipe) => ({
    ...recipe,
    totalMinutes: recipe.prepTimeMinutes + recipe.cookTimeMinutes,
    url: canonicalPath(recipe),
  }));
  return {
    recipes,
    recipesById: new Map(recipes.map((recipe) => [recipe.id, recipe])),
    cuisines: [...new Set(recipes.map(({ cuisine }) => cuisine))].toSorted(),
  };
}

/**
 * Canonical URL of a recipe, e.g. "/12-classic-margherita-pizza".
 *
 * @param {{id: number, name: string}} recipe
 */
function canonicalPath({ id, name }) {
  return `/${id}-${name
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/\W+/g, "-")
    .replace(/^-+|-+$/g, "")}`;
}
