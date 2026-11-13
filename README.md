# Jeasx - The power of server-side rendering with the ease of JSX

Jeasx renders HTML on the server using JSX. It has no client-side framework, no hydration and no complex build setup. You write JSX components, Jeasx turns them into HTML and sends it to the browser.

This repository is the starter template. It includes a small example app (a recipe browser) that shows the most important features.

Full documentation: <https://www.jeasx.dev>

## Quickstart

You need a current LTS version of [Node.js](https://nodejs.org).

```bash
npm create jeasx@latest my-app
cd my-app
npm run dev
```

Open <http://localhost:3000> in your browser. Changes to files in `src/` are picked up automatically.

If you omit `my-app`, the project is created in a folder named `jeasx-quickstart`.

## Project structure

```text
src/
├── [index].jsx          # Route: the home page (/)
├── [...path].jsx        # Route: catch-all, used here for recipe detail pages
├── [404].jsx            # Route: shown when no other route matches
├── [health].json        # Route: a simple health check returning JSON
├── [...guard].js        # Guard: runs before the routes in its folder and below
├── components/          # Reusable JSX components (no brackets = not a route)
│   ├── Clipboard.jsx    # Copy-to-clipboard button
│   ├── CuisineFilter.jsx # Cuisine filter links for the home page
│   ├── Layout.jsx       # Shared HTML page layout
│   ├── RecipeDetail.jsx # Recipe detail view (image, ingredients, instructions)
│   ├── RecipeTable.jsx  # Sortable recipe table for the home page
│   └── ServiceUnavailable.jsx
├── recipes.js           # Shared recipe loader + in-memory cache (with derived values)
└── browser/             # Client-side JavaScript and CSS, bundled for the browser
    ├── index.js
    └── index.css
public/                  # Static files served as-is (favicon, robots.txt, ...)
jeasx.config.js          # Optional settings for esbuild and Fastify
```

### How routing works

Only files with **square brackets** in their name are routes. Everything else is a normal module you can import.

| File                     | Matches                                 |
| ------------------------ | --------------------------------------- |
| `src/[index].jsx`        | `/`                                     |
| `src/about/[index].jsx`  | `/about`                                |
| `src/[contact].jsx`      | `/contact`                              |
| `src/[...path].jsx`      | any path not matched by a more specific route |
| `src/[404].jsx`          | fallback when nothing else matches      |
| `src/[...guard].js`      | runs before every route in its folder   |

A route exports a default function. It receives `request` and `reply` (from [Fastify](https://fastify.dev)) and returns JSX, a string or JSON:

```jsx
export default function ({ request }) {
  return <h1>Hello {request.query.name ?? "World"}</h1>;
}
```

Components can be `async`, so you can load data directly where you need it. See [src/[index].jsx](src/[index].jsx) for an example.

See the [routes documentation](https://www.jeasx.dev/routes) for details, including guards.

## Scripts

| Command         | What it does                                      |
| --------------- | ------------------------------------------------- |
| `npm run dev`   | Start the dev server, rebuilds on file changes    |
| `npm run build` | Build the app for production into `dist/`         |
| `npm start`     | Run the production build                          |
| `npm run clean` | Remove build output                               |

## Deployment

Build and start the app on any server with Node.js:

```bash
npm run build
npm start
```

### Docker

Bootstrap a new project with a ready-to-use `Dockerfile`:

```bash
npm create jeasx@latest -- my-app --with-docker
```

### Vercel

Bootstrap a new project with the configuration needed for Vercel:

```bash
npm create jeasx@latest -- my-app --with-vercel
```

## Next steps

- Delete the example code in `src/` and start with your own `[index].jsx`.
- Follow the [tutorial](https://www.jeasx.dev/tutorial) or read about [configuration](https://www.jeasx.dev/configuration) and [hosting](https://www.jeasx.dev/hosting).
