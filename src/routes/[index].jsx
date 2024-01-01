/* This file is an example. Delete it at will. */

import Layout from "./Layout";

/**
 * @param {import("./types").RouteProps} props
 */
export default function Homepage({}) {
  return (
    <Layout title="Jeasx - JSX with Ease" description="Welcome to the homepage">
      {[1, 2, 3].map((num) => (
        <a href={`/subfolder/page-${num}`}>Page {num}</a>
      ))}
    </Layout>
  );
}
