/* This file is an example. Delete it at will. */

import Layout from "./Layout";

/**
 * @this {import("./types").ThisContext}
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
      title="Jeasx - Quickstart"
      description="Get up and running in seconds."
    >
      <header>
        <h1>Jeasx</h1>
        <p>The power of server-side rendering with the ease of JSX</p>
      </header>
      <main>
        <section>
          <h2>Quickstart</h2>
          <code>{this.escape(cmds.join("\n"))}</code>
          <button data-clipboard={this.escape(cmds.join(" && "))}>Copy</button>
          <hr />
          <a href="https://www.jeasx.dev">Learn more about Jeasx</a>
        </section>
      </main>
    </Layout>
  );
}
