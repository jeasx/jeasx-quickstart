/* This file is an example. Delete it at will. */

import Layout from "./Layout";

/**
 * @param {import("./types").RouteProps} props
 */
export default function Homepage({}) {
  return (
    <Layout title="Jeasx" description="Welcome to Jeasx - JSX with Ease">
      <header>
        <h1>Jeasx - JSX with Ease</h1>
      </header>
      <main>
        <section>
          {[1, 2, 3].map((num) => (
            <a href={`/subfolder/page-${num}`}>Page {num}</a>
          ))}
        </section>
      </main>
    </Layout>
  );
}
