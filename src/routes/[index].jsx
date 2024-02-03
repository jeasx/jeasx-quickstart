/* This file is an example. Delete it at will. */

import Layout from "./Layout";

/**
 * @param {import("./types").RouteProps} props
 */
export default function Homepage({}) {
  const cmds = [
    "npm create jeasx@latest",
    "cd jeasx-quickstart",
    "npm run dev",
  ];

  return (
    <Layout
      title="jeasx - Quickstart"
      description="Get up and running in seconds."
    >
      <header>
        <h1>jeasx</h1>
        <p>The power of server-side rendering with the ease of JSX</p>
      </header>
      <main>
        <section>
          <h2>Quickstart</h2>
          <code>{cmds.join("\n")}</code>
          <button
            onclick={`navigator.clipboard.writeText('${cmds.join(" && ")}')`}
          >
            Copy
          </button>
          <hr />
          <a href="https://github.com/jeasx/quickstart">
            Visit repository at GitHub
          </a>
        </section>
      </main>
    </Layout>
  );
}
