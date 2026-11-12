/* This file is an example. Feel free to delete it. */

import { html } from "jsx-async-runtime";

/**
 * @this {import("../types").ThisContext}
 */
export default function Layout({ title = "", description = "", children = undefined }) {
  const path = this.request.path;
  // Pages with query parameters (filters, tracking, ...) should not be indexed.
  const hasQuery = Object.keys(this.request.query ?? {}).length > 0;

  return (
    <>
      {html("<!DOCTYPE html>")}
      <html lang="en">
        <head>
          <base href={path.endsWith("/") ? path : `${path}/`} />
          <meta charset="utf-8" />
          <meta name="description" content={description} />
          {hasQuery && <meta name="robots" content={"noindex, follow"} />}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" href={`/index.css?v=${process.env.BUILD_ID}`} />
          <script type="module" src={`/index.js?v=${process.env.BUILD_ID}`} />
          <title>{title} | Jeasx - JSX with ease</title>
        </head>
        <body>
          <main>{children}</main>
          <footer>
            <hr />
            <h5>Jeasx - Quickstart</h5>
            <p>
              Explore this sample app to get started with Jeasx quickly. Visit the{" "}
              <a href="https://www.jeasx.dev">Jeasx website</a> to learn more about the framework.
            </p>
          </footer>
        </body>
      </html>
    </>
  );
}
