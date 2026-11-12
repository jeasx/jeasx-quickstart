/* This file is an example. Feel free to delete it. */

// Stored on globalThis (not in module variables),
// because every route is bundled separately
// and gets its own copy of this module.

/**
 * True once the recipes are loaded, so rendering them can't fail anymore.
 */
export function recipesLoaded() {
  return globalThis.$recipes !== undefined;
}

/**
 * Cache data in memory to avoid unnecessary API calls.
 * Loaded on first request; concurrent requests share the pending load,
 * a failed load is retried on the next request.
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
