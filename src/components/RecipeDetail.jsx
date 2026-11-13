/* This file is an example. Feel free to delete it. */

import Clipboard from "./Clipboard";

/**
 * Full recipe with image, ingredients and instructions.
 *
 * @param {{ recipe: import("../recipes").Recipe }} props
 */
export default function RecipeDetail({ recipe }) {
  const { id, name, ingredients, instructions, image, difficulty, cuisine, totalMinutes } = recipe;

  return (
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
  );
}
