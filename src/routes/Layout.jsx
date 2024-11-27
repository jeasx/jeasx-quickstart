/* This file is an example. Delete it at will. */

/**
 * @this {import("./types").ThisContext}
 */
export default function Layout({
  title = "",
  description = "",
  children = [],
}) {
  // Shortcut for request path
  const path = this.request.path;

  // Create a version number to cache-bust js & css files
  // at runtime for development and at build time for production.
  const version =
    process.env.NODE_ENV === "development"
      ? Date.now().toString(36)
      : process.env.BUILD_TIME;

  return (
    <>
      {`<!DOCTYPE html>`}
      <html lang="en">
        <head>
          <base href={`${path.endsWith("/") ? path : path + "/"}`} />
          <meta charset="utf-8" />
          <meta name="description" content={description} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" href={`/index.css?${version}`} />
          <script type="module" src={`/index.js?${version}`} />
          <title>{title}</title>
        </head>
        <body>{children}</body>
      </html>
    </>
  );
}
