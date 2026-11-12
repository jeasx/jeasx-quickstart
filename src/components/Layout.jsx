/* This file is an example. Feel free to delete it. */

import { html } from "jsx-async-runtime";

/**
 * @this {import("../types").ThisContext}
 */
export default function Layout({
  title = "",
  description = "",
  robots = undefined,
  children = undefined,
}) {
  const path = this.request.path;

  return (
    <>
      {html("<!DOCTYPE html>")}
      <html lang="en">
        <head>
          <base href={path.endsWith("/") ? path : `${path}/`} />
          <meta charset="utf-8" />
          <meta name="description" content={description} />
          {robots && <meta name="robots" content={robots} />}
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
