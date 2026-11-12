/* This file is an example. Feel free to delete it. */

/**
 * @typedef {{id: number, name: string, cuisine: string, difficulty: string, image: string,
 *   ingredients: string[], instructions: string[], prepTimeMinutes: number, cookTimeMinutes: number}} Recipe
 * @typedef {{recipes: Recipe[], cuisines: string[]}} RecipeData
 */

/**
 * True once the recipes are loaded, so rendering them can't fail anymore.
 */
export function recipesLoaded() {
  return Boolean(globalThis.$recipes);
}

/**
 * Cache data in memory to avoid unnecessary API calls.
 * Loaded on first request; concurrent requests share the pending load,
 * a failed load is retried on the next request.
 *
 * @returns {Promise<RecipeData>}
 */
export function loadRecipes() {
  if (globalThis.$recipes) {
    return Promise.resolve(globalThis.$recipes);
  }
  globalThis.$recipesPending ??= fetchRecipes()
    .then((data) => (globalThis.$recipes = data))
    .finally(() => (globalThis.$recipesPending = undefined));
  return globalThis.$recipesPending;
}

async function fetchRecipes() {
  const response = await fetch("https://dummyjson.com/recipes?limit=0", {
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) {
    throw new Error(`Failed to load recipes: ${response.status}`);
  }
  const { recipes } = await response.json();
  return {
    recipes,
    cuisines: [...new Set(recipes.map(({ cuisine }) => cuisine))].toSorted(),
  };
}
