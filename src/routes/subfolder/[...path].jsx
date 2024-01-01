/* This file is an example. Delete it at will. */

import { requestContext } from "@fastify/request-context";
import Layout from "../Layout";

/**
 * @param {import("../types").RouteProps} props
 */
export default function DynamicPage({}) {
  const path = requestContext.get("request").urlData().path;

  return (
    <Layout title="JSX with Ease = Jeasx" description={`Welcome to ${path}`}>
      <h2>{path}</h2>
      <a href="/">Go to homepage</a>
    </Layout>
  );
}
