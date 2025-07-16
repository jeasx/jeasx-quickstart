/* This file is an example. Delete it at will. */

import Layout from "./Layout";

/**
 * @this {import("./types").ThisContext}
 * @param {import("./types").RouteProps} props
 */
export default async function ({}) {
  const { recipes } = await (
    await fetch("https://dummyjson.com/recipes")
  ).json();

  return (
    <Layout title="Recipes" description="Have fun cooking.">
      <main>
        <h1>Recipes</h1>
        <p>Here you will find some exciting recipes to cook at home.</p>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Cuisine</th>
              <th>Difficulty</th>
              <th>Minutes</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map(
              ({
                id,
                name,
                cuisine,
                difficulty,
                image,
                prepTimeMinutes,
                cookTimeMinutes,
              }) => (
                <tr>
                  <td>
                    <a href={`${id}`}>{name}</a>
                  </td>
                  <td>{cuisine}</td>
                  <td>{difficulty}</td>
                  <td>{prepTimeMinutes + cookTimeMinutes} min</td>
                  <td>
                    <img src={image} height="50" width="50" loading="lazy" />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </main>
    </Layout>
  );
}
