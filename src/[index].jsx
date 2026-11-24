/* This file is an example. Feel free to delete it. */

import CuisineFilter from "./components/CuisineFilter";
import Layout from "./components/Layout";
import RecipeTable from "./components/RecipeTable";
import ServiceUnavailable from "./components/ServiceUnavailable";
import tryLoadRecipes from "./recipes";

/**
 * @param {import("./types").RouteProps} props
 */
export default async function ({ request, reply }) {
  const recipeData = await tryLoadRecipes();
  if (!recipeData) {
    return <ServiceUnavailable />;
  }

  const selectedCuisine = (request.query ?? {})["cuisine"];
  const title = selectedCuisine ? `${selectedCuisine} Recipes` : "Recipes";
  const description = `Have fun cooking ${selectedCuisine ? `${selectedCuisine} ` : ""}recipes`;
  const recipes = selectedCuisine
    ? recipeData.recipes.filter(({ cuisine }) => cuisine === selectedCuisine)
    : recipeData.recipes;

  if (recipes.length === 0) {
    return reply.redirect("/", 301);
  }

  return (
    <Layout title={title} description={description}>
      <h1>{title}</h1>
      <p>Discover delicious recipes to cook at home.</p>
      <CuisineFilter cuisines={recipeData.cuisines} selected={selectedCuisine} />
      <RecipeTable recipes={recipes} />
    </Layout>
  );
}
