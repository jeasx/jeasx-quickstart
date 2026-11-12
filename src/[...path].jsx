/* This file is an example. Feel free to delete it. */

import Clipboard from "./components/Clipboard";
import Layout from "./components/Layout";
import { loadRecipes } from "./utils/recipes";
import slugify from "./utils/slugify";

const RECIPE_PATH = new URLPattern({ pathname: "/:id(\\d+){-*}?" });

/**
 * @param {import("./types").RouteProps} props
 */
export default async function ({ request, reply }) {
  // Only accept paths like "/12" or "/12-some-slug".
  const id = RECIPE_PATH.exec({ pathname: request.path })?.pathname.groups.id;
  if (!id) {
    return;
  }

  const data = await loadRecipes().catch((error) => {
    request.log.error(error);
    return null;
  });

  const recipe = data?.recipes.find((recipe) => recipe.id === Number(id));
  if (!recipe) {
    return;
  }

  const {
    name,
    ingredients,
    instructions,
    image,
    difficulty,
    cuisine,
    prepTimeMinutes,
    cookTimeMinutes,
  } = recipe;

  // Redirect "/12" or "/12-wrong-slug" to the canonical URL.
  const canonicalPath = `/${id}-${slugify(name)}`;
  if (request.path !== canonicalPath) {
    const query = request.url.includes("?") ? request.url.slice(request.url.indexOf("?")) : "";
    return reply.redirect(canonicalPath + query, 301);
  }

  return (
    <Layout title={name} description={`${name} - ${cuisine} - ${difficulty}`}>
      <a href="/" data-js-back>
        &laquo; Back
      </a>
      <article>
        <h1 style={`view-transition-name: title-${id}`}>{name}</h1>
        <p>
          {cuisine} / {difficulty} / {prepTimeMinutes + cookTimeMinutes} min
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
