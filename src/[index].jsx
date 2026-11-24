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

  const cuisine = parseCuisine(request.query, recipeData.cuisines);
  const title = cuisine ? `${cuisine} Recipes` : "Recipes";
  const description = `Have fun cooking ${cuisine ? `${cuisine} ` : ""}recipes`;
  const recipes = cuisine
    ? recipeData.recipes.filter(({ cuisine }) => cuisine === cuisine)
    : recipeData.recipes;

  return (
    <Layout title={title} description={description}>
      <h1>{title}</h1>
      <p>Discover delicious recipes to cook at home.</p>
      <CuisineFilter cuisines={recipeData.cuisines} selected={cuisine} />
      <RecipeTable recipes={recipes} />
    </Layout>
  );
}

/**
 * Selected cuisine from the query string, e.g. ?cuisine=Italian.
 * Unknown or repeated values are ignored.
 *
 * @param {unknown} query Fastify types the parsed query string as unknown.
 * @param {string[]} known
 * @returns {string | undefined}
 */
function parseCuisine(query, known) {
  const cuisine = /** @type {Record<string, unknown>} */ (query ?? {})["cuisine"];
  return typeof cuisine === "string" && known.includes(cuisine) ? cuisine : undefined;
}
