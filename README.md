Welcome to your new TanStack Start app!

# Getting Started

To run this application:

```bash
pnpm install
pnpm run dev
```

# Building For Production

To build this application for production:

```bash
pnpm run build
```

## Adding a project

Project pages are generated at build time from a `.dylan/` directory in each public
repo. A repo without one is never listed, so this is also the opt-in.

```
.dylan/
  meta.toml            # required — everything below is optional
  description.md       # falls back to the GitHub repo description
  description.nl.md
  story.md
  story.nl.md
  banner.png           # falls back to GitHub's social preview
  star/
    1-something.md     # one STAR entry per file, ordered by filename
    1-something.nl.md
```

```toml
featured = true
weight   = 10                    # lower sorts first; unset sorts as 1000

[[release.packages]]             # only when actually published
registry = "nuget"               # nuget | maven
id       = "Loom.Results"        # maven uses "group:artifact"

[[links]]
url      = "https://example.com/docs"
label    = "Documentation"
label_nl = "Documentatie"

[[uses]]                         # "used by" is derived; never declare the reverse
repo = "Loom"
note = "Result types"
```

Each STAR entry is its own markdown file in `.dylan/star/`, so it can be written like
prose and translated per file. The `##` headings are machine keys and stay English in
every locale — the labels the page renders come from the site's message catalogs.

```md
# Cutting allocation overhead

## situation
Hot paths allocated on every call…

## task
…

## action
…

## result
…
```

The version comes from the newest semver git tag. Unknown keys, wrong types, and STAR
files with a missing or misspelt section fail the build rather than silently doing
nothing.

Then add this workflow to the project repo so the site rebuilds when you release or
edit the page. `VERCEL_DEPLOY_HOOK` is the hook URL from Vercel → Settings → Git.

```yaml
name: Update portfolio
on:
  push:
    tags: ['v*']
    branches: [main]
    paths: ['.dylan/**']
jobs:
  rebuild:
    runs-on: ubuntu-latest
    steps:
      - run: curl -fsS -X POST "${{ secrets.VERCEL_DEPLOY_HOOK }}"
```

Locally, `pnpm run build:projects` refreshes the data and `pnpm run check:projects`
runs the pipeline checks. Set `GITHUB_TOKEN` to avoid the 60-request/hour
unauthenticated limit.

## Styling

This project uses [Tailwind CSS](https://tailwindcss.com/) for styling.

## Linting & Formatting

This project uses [Biome](https://biomejs.dev/) for linting and formatting. The following scripts are available:


```bash
pnpm run lint
pnpm run format
pnpm run check
```


## Deploy with Nitro

This project uses Nitro as a generic server adapter, so it can run on any Node-compatible host.

```bash
pnpm run build
node dist/server/index.mjs
```

The build output is a self-contained Node server. To deploy, push the `dist/` directory to your host (Render, Fly.io, your own VPS, etc.) and run the server command above.

For host-specific presets (Vercel, Netlify, Cloudflare, AWS Lambda, etc.) and tuning, see https://v3.nitro.build/deploy.


## T3Env

- You can use T3Env to add type safety to your environment variables.
- Add Environment variables to the `src/env.mjs` file.
- Use the environment variables in your code.

### Usage

```ts
import { env } from "#/env";

console.log(env.VITE_APP_TITLE);
```






## Routing

This project uses [TanStack Router](https://tanstack.com/router) with file-based routing. Routes are managed as files in `src/routes`.

### Adding A Route

To add a new route to your application just add a new file in the `./src/routes` directory.

TanStack will automatically generate the content of the route file for you.

Now that you have two routes you can use a `Link` component to navigate between them.

### Adding Links

To use SPA (Single Page Application) navigation you will need to import the `Link` component from `@tanstack/react-router`.

```tsx
import { Link } from "@tanstack/react-router";
```

Then anywhere in your JSX you can use it like so:

```tsx
<Link to="/about">About</Link>
```

This will create a link that will navigate to the `/about` route.

More information on the `Link` component can be found in the [Link documentation](https://tanstack.com/router/v1/docs/framework/react/api/router/linkComponent).

### Using A Layout

In the File Based Routing setup the layout is located in `src/routes/__root.tsx`. Anything you add to the root route will appear in all the routes. The route content will appear in the JSX where you render `{children}` in the `shellComponent`.

Here is an example layout that includes a header:

```tsx
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'My App' },
    ],
  }),
  shellComponent: ({ children }) => (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <header>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </nav>
        </header>
        {children}
        <Scripts />
      </body>
    </html>
  ),
})
```

More information on layouts can be found in the [Layouts documentation](https://tanstack.com/router/latest/docs/framework/react/guide/routing-concepts#layouts).

## Server Functions

TanStack Start provides server functions that allow you to write server-side code that seamlessly integrates with your client components.

```tsx
import { createServerFn } from '@tanstack/react-start'

const getServerTime = createServerFn({
  method: 'GET',
}).handler(async () => {
  return new Date().toISOString()
})

// Use in a component
function MyComponent() {
  const [time, setTime] = useState('')
  
  useEffect(() => {
    getServerTime().then(setTime)
  }, [])
  
  return <div>Server time: {time}</div>
}
```

## API Routes

You can create API routes by using the `server` property in your route definitions:

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

export const Route = createFileRoute('/api/hello')({
  server: {
    handlers: {
      GET: () => json({ message: 'Hello, World!' }),
    },
  },
})
```

## Data Fetching

There are multiple ways to fetch data in your application. You can use TanStack Query to fetch data from a server. But you can also use the `loader` functionality built into TanStack Router to load the data for a route before it's rendered.

For example:

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/people')({
  loader: async () => {
    const response = await fetch('https://swapi.dev/api/people')
    return response.json()
  },
  component: PeopleComponent,
})

function PeopleComponent() {
  const data = Route.useLoaderData()
  return (
    <ul>
      {data.results.map((person) => (
        <li key={person.name}>{person.name}</li>
      ))}
    </ul>
  )
}
```

Loaders simplify your data fetching logic dramatically. Check out more information in the [Loader documentation](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#loader-parameters).

# Learn More

You can learn more about all of the offerings from TanStack in the [TanStack documentation](https://tanstack.com).

For TanStack Start specific documentation, visit [TanStack Start](https://tanstack.com/start).
