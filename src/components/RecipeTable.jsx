/* This file is an example. Feel free to delete it. */

/**
 * Sortable table of recipes (see `src/browser/scripts/sort.js`).
 *
 * @param {{ recipes: import("../recipes").Recipe[] }} props
 */
export default function RecipeTable({ recipes }) {
  return (
    <div class="table-wrap">
      <table data-js-sort>
        <thead>
          <tr>
            <th>Image</th>
            <th data-js-sort>Name</th>
            <th data-js-sort>Cuisine</th>
            <th data-js-sort>Difficulty</th>
            <th data-js-sort>Minutes</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map(
            ({ id, name, cuisine, difficulty, difficultyRank, image, totalMinutes, url }) => (
              <tr>
                <td>
                  <img
                    src={image}
                    alt=""
                    style={`view-transition-name: recipe-${id}`}
                    height="50"
                    width="50"
                    loading="lazy"
                  />
                </td>
                <td>
                  <a href={url} style={`view-transition-name: title-${id}`}>
                    {name}
                  </a>
                </td>
                <td>{cuisine}</td>
                <td data-sort-value={difficultyRank}>{difficulty}</td>
                <td data-sort-value={totalMinutes}>{totalMinutes} min</td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}
