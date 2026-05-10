/* This file is an example. Delete it at will. */

import Clipboard from "./components/Clipboard";
import Layout from "./Layout";

/**
 * @this {import("./types").ThisContext}
 * @param {import("./types").RouteProps} props
 */
export default async function ({ request, reply }) {
  const [id] = request.path.split("-", 1);
  const response = await fetch(`https://dummyjson.com/recipes${id}`);

  if (!response.ok) {
    reply.status(404);
    return;
  }

  const { name, ingredients, instructions, image, difficulty, cuisine } = await response.json();

  return (
    <Layout title={name} description={`${name} - ${cuisine} - ${difficulty} `}>
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
            <Clipboard list={ingredients} />
            <ul>
              {ingredients.map((ingredient) => (
                <li>{ingredient}</li>
              ))}
            </ul>
          </div>
        </div>
        <h2>Instructions</h2>
        <Clipboard list={instructions} />
        <ol>
          {instructions.map((instruction) => (
            <li>{instruction}</li>
          ))}
        </ol>
      </article>
    </Layout>
  );
}
