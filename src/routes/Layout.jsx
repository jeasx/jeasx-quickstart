/**
 * @this {import("./types").ThisContext}
 */
export default function Layout({ title = "", children = undefined }) {
  const path = this.request.path;

  return (
    <>
      {`<!DOCTYPE html>`}
      <html lang="en">
        <head>
          <base href={`${path.endsWith("/") ? path : path + "/"}`} />
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="stylesheet"
            href={`/index.css?${process.env.BUILD_TIME}`}
          />
          <script type="module" src={`/index.js?${process.env.BUILD_TIME}`} />
          <title>{title}</title>
        </head>
        <body>{children}</body>
      </html>
    </>
  );
}
