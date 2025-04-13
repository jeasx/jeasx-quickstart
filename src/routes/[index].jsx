import Layout from "./Layout";

/**
 * @this {import("./types").ThisContext}
 * @param {import("./types").RouteProps} props
 */
export default function Homepage({}) {
  return (
    <Layout title="Neoskop-Job-Server">
      <ul>
        <li>
          <a href="/preload">Preload</a>
        </li>
      </ul>
    </Layout>
  );
}
