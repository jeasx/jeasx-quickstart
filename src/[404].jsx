/* This file is an example. Feel free to delete it. */

import Layout from "./components/Layout";

/**
 * @param {import("./types").RouteProps} props
 */
export default function ({ request }) {
  return (
    <Layout title="404 - Page Not Found" description="The page you requested could not be found.">
      <h1>404 - Page Not Found</h1>
      <p>The page &raquo;{request.path}&laquo; could not be found.</p>
      <a href="/">Go to homepage</a>
    </Layout>
  );
}
