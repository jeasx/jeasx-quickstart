/* This file is an example. Delete it at will. */

import Layout from "./Layout";

/**
 * @param {import("./types").RouteProps} props
 */
export default function Homepage({}) {
  const cmds = [
    "npx -y giget --install gh:jeasx/quickstart",
    "cd jeasx-quickstart",
    "npm run dev",
  ];

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
          <textarea readonly disabled rows="3">
            {cmds.join("\n")}
          </textarea>
          <button
            onclick={`navigator.clipboard.writeText('${cmds.join(" && ")}')`}
          >
            Copy
          </button>
          <hr />
          <a href="https://github.com/jeasx/quickstart">Visit code at GitHub</a>
        </section>
      </main>
    </Layout>
  );
}
