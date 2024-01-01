/* This file is an example. Delete it at will. */

import Headline from "../components/Headline";
import Layout from "../components/Layout";

/**
 * @param {import("./types").RouteProps} props
 */
export default function ResourceNotFoundPage({}) {
  return (
    <Layout
      title="404 - Resource Not Found"
      description="The resource you requested has not been found at the specified
    address."
    >
      <Headline level={2}>
        The resource you requested has not been found at the specified address.
      </Headline>
      <a href="/">Go to homepage</a>
    </Layout>
  );
}
