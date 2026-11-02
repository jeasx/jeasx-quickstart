/* This file is an example. Feel free to delete it. */

import Clipboard from "./components/Clipboard";
import Layout from "./components/Layout";

const RECIPE_PATH = new URLPattern({ pathname: "/:id(\\d+){-*}?" });

/**
 * @param {import("./types").RouteProps} props
 */
export default async function ({ request }) {
  // Only accept paths like "/12" or "/12-some-slug".
  const id = RECIPE_PATH.exec({ pathname: request.path })?.pathname.groups.id;
  if (!id) {
    return;
  }

  const response = await fetch(`https://dummyjson.com/recipes/${id}`).catch(() => null);
  if (!response?.ok) {
    return;
  }

  const { name, ingredients, instructions, image, difficulty, cuisine } = await response.json();

  return (
    <Layout title={name} description={`${name} - ${cuisine} - ${difficulty}`}>
      <a href="/" data-js-back>
        &laquo; Back
      </a>
      <article>
        <h1>{name}</h1>
        <p>
          {cuisine} / {difficulty}
        </p>
        <div class="row">
          <div class="col">
            <img src={image} alt={name} width="400" />
          </div>
          <div class="col">
            <h2>Ingredients</h2>
            <Clipboard title="Copy ingredients to clipboard" list={ingredients} />
            <ul>
              {ingredients.map((ingredient) => (
                <li>{ingredient}</li>
              ))}
            </ul>
          </div>
        </div>
        <h2>Instructions</h2>
        <Clipboard title="Copy instructions to clipboard" list={instructions} />
        <ol>
          {instructions.map((instruction) => (
            <li>{instruction}</li>
          ))}
        </ol>
      </article>
    </Layout>
  );
}
