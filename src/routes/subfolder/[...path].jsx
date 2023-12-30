/* This file is an example. Delete it at will. */

import { requestContext } from "@fastify/request-context";
import Layout from "../Layout";

/**
 * @param {import("../types").RouteProps} props
 */
export default function DynamicPage({}) {
  const path = requestContext.get("request").urlData().path;

  return (
    <Layout title="Jeasx" description="Welcome to Jeasx - JSX with Ease">
      <header>
        <h1>Jeasx - JSX with Ease</h1>
      </header>
      <main>
        <section>
          <h2>{path}</h2>
          <a href="/">Go to homepage</a>
        </section>
      </main>
    </Layout>
  );
}
