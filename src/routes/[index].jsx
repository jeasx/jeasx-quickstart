/* This file is an example. Delete it at will. */

import Layout from "../components/Layout";

/**
 * @param {import("./types").RouteProps} props
 */
export default function Homepage({}) {
  return (
    <Layout
      title="Jeasx - JSX with Ease"
      description="How to get up and running with Jeasx in seconds."
    >
      <header>
        <h1>Jeasx - JSX with Ease</h1>
      </header>
      <main>
        <section>
          <h2>Quickstart</h2>
          <textarea
            readonly
            rows="3"
            onfocus="setTimeout(() => this.select(), 100)"
          >
            {`npx giget --install gh:jeasx/quickstart\ncd jeasx-quickstart\nnpm run dev`}
          </textarea>
          <hr />
          <a href="https://github.com/jeasx/quickstart">Go to GitHub</a>
        </section>
      </main>
    </Layout>
  );
}
