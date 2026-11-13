/* This file is an example. Feel free to delete it. */

import Layout from "./Layout";

/**
 * @this {import("../types").ThisContext}
 */
export default function ServiceUnavailable() {
  this.reply.status(503).header("Retry-After", "60");
  return (
    <Layout title="Service Unavailable" description="Recipes could not be loaded.">
      <h1>Service Unavailable</h1>
      <p>Recipes could not be loaded. Please try again later.</p>
    </Layout>
  );
}
