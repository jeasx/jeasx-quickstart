/* This file is an example. Delete it at will. */

import Headline from "../../components/Headline";
import Layout from "../../components/Layout";

/**
 * @param {import("../types").RouteProps} props
 */
export default function DynamicPage({ request }) {
  const path = request.urlData().path;

  return (
    <Layout title="JSX with Ease = Jeasx" description={`Welcome to ${path}`}>
      <Headline level={2}>{path}</Headline>
      <a href="/">Go to homepage</a>
    </Layout>
  );
}
