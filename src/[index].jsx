/* This file is an example. Feel free to delete it. */

import CuisineFilter from "./components/CuisineFilter";
import Layout from "./components/Layout";
import RecipeTable from "./components/RecipeTable";
import ServiceUnavailable from "./components/ServiceUnavailable";
import tryLoadRecipes from "./recipes";

/**
 * @param {import("./types").RouteProps} props
 */
export default async function ({ request }) {
  const recipeData = await tryLoadRecipes();
  if (!recipeData) {
    return <ServiceUnavailable />;
  }

  const selectedCuisines = parseCuisines(request.query, recipeData.cuisines);
  const filteredRecipes = filterRecipesByCuisines(recipeData.recipes, selectedCuisines);
  const { title, description } = titleAndDescription(selectedCuisines);

  return (
    <Layout title={title} description={description}>
      <h1>{title}</h1>
      <p>Discover delicious recipes to cook at home.</p>
      <CuisineFilter cuisines={recipeData.cuisines} selected={selectedCuisines} />
      <RecipeTable recipes={filteredRecipes} />
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
function filterRecipesByCuisines(recipes, selected) {
  return selected.length ? recipes.filter(({ cuisine }) => selected.includes(cuisine)) : recipes;
}

/**
 * Page title and meta description for the selected cuisines.
 *
 * @param {string[]} cuisines
 */
function titleAndDescription(cuisines) {
  const label = cuisines.join(", ");
  return {
    title: label ? `${label} Recipes` : "Recipes",
    description: label ? `Have fun cooking ${label} recipes` : "Have fun cooking recipes",
  };
}
