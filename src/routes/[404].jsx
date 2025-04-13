import Layout from "./Layout";

/**
 * @param {import("./types").RouteProps} props
 */
export default function ResourceNotFoundPage({}) {
  return (
    <Layout title="404 - Resource Not Found">
      <header>
        <h1>404 - Resource Not Found</h1>
      </header>
      <main>
        <section>
          <h2>
            The resource you requested has not been found at the specified
            address.
          </h2>
          <a href="/">Go to homepage</a>
        </section>
      </main>
    </Layout>
  );
}
