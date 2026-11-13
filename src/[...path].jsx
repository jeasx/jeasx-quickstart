/* This file is an example. Feel free to delete it. */

import Layout from "./components/Layout";
import RecipeDetail from "./components/RecipeDetail";
import ServiceUnavailable from "./components/ServiceUnavailable";
import tryLoadRecipes from "./recipes";

const RECIPE_PATH = new URLPattern({ pathname: "/:id(\\d+){-*}?" });

/**
 * @param {import("./types").RouteProps} props
 */
export default async function ({ request, reply }) {
  // Only accept paths like "/12" or "/12-some-slug".
  const recipeId = RECIPE_PATH.exec({ pathname: request.path })?.pathname.groups.id;
  if (!recipeId) {
    return;
  }

  const recipeData = await tryLoadRecipes();
  if (!recipeData) {
    return <ServiceUnavailable />;
  }

  const recipe = recipeData.recipesById.get(Number(recipeId));
  if (!recipe) {
    return;
  }

  // Redirect "/12" or "/12-wrong-slug" to the canonical URL.
  if (request.path !== recipe.url) {
    return reply.redirect(recipe.url, 301);
  }

  const { name, cuisine, difficulty } = recipe;

  return (
    <Layout title={name} description={`${name} - ${cuisine} - ${difficulty}`}>
      <a href="/" data-js-back>
        &laquo; Back
      </a>
      <RecipeDetail recipe={recipe} />
    </Layout>
  );
}
