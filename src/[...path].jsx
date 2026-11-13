/* This file is an example. Feel free to delete it. */

import Clipboard from "./components/Clipboard";
import Layout from "./components/Layout";
import ServiceUnavailable from "./components/ServiceUnavailable";
import tryLoadRecipes from "./recipes";

const RECIPE_PATH = new URLPattern({ pathname: "/:id(\\d+){-*}?" });

/**
 * @param {import("./types").RouteProps} props
 */
export default async function ({ request, reply }) {
  // Only accept paths like "/12" or "/12-some-slug".
  const requestId = RECIPE_PATH.exec({ pathname: request.path })?.pathname.groups.id;
  if (!requestId) {
    return;
  }

  const recipeData = await tryLoadRecipes();
  if (!recipeData) {
    return <ServiceUnavailable />;
  }

  const recipe = recipeData.recipesById.get(Number(requestId));
  if (!recipe) {
    return;
  }

  // Redirect "/12" or "/12-wrong-slug" to the canonical URL.
  if (request.path !== recipe.url) {
    return reply.redirect(recipe.url, 301);
  }

  const { id, name, ingredients, instructions, image, difficulty, cuisine, totalMinutes } = recipe;

  return (
    <Layout title={name} description={`${name} - ${cuisine} - ${difficulty}`}>
      <a href="/" data-js-back>
        &laquo; Back
      </a>
      <article>
        <h1 style={`view-transition-name: title-${id}`}>{name}</h1>
        <p>
          {cuisine} / {difficulty} / {totalMinutes} min
        </p>
        <div class="row">
          <div class="col">
            <img
              src={image}
              alt={name}
              width="400"
              height="400"
              style={`view-transition-name: recipe-${id}`}
            />
          </div>
          <div class="col">
            <h2>
              Ingredients <Clipboard title="Copy ingredients to clipboard" list={ingredients} />
            </h2>
            <ul>
              {ingredients.map((ingredient) => (
                <li>{ingredient}</li>
              ))}
            </ul>
          </div>
        </div>
        <h2>
          Instructions <Clipboard title="Copy instructions to clipboard" list={instructions} />
        </h2>
        <ol>
          {instructions.map((instruction) => (
            <li>{instruction}</li>
          ))}
        </ol>
      </article>
    </Layout>
  );
}
