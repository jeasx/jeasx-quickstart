/* This file is an example. Delete it at will. */

/**
 * @this {import("./types").RouteProps}
 */
export default function Layout({
  title = "",
  description = "",
  children = [],
}) {
  const path = this.request.path;

  return (
    <>
      {`<!DOCTYPE html>`}
      <html lang="en">
        <head>
          <base href={`${path.endsWith("/") ? path : path + "/"}`} />
          <meta charset="utf-8" />
          <meta name="description" content={description} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="stylesheet"
            href={`/index.css?${process.env.BUILD_TIME}`}
          />
          <title>{title}</title>
        </head>
        <body>{children}</body>
      </html>
    </>
  );
}
