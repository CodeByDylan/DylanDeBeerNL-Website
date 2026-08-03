import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'
import projects from './src/data/projects.generated.json' with { type: 'json' }

// Written by `build:projects`, which always runs before vite.
const projectPages = (projects as Array<{ slug: string }>).map((project) => ({
  path: `/projects/${project.slug}`,
}))

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  // Bundle the workspace theme into the SSR build instead of resolving the symlink at runtime.
  ssr: { noExternal: ['@dylandebeer/theme-pastel'] },
  plugins: [
    devtools(),
    nitro({ rollupConfig: { external: [/^@sentry\//] } }),
    tailwindcss(),
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true, failOnError: true },
      pages: projectPages,
    }),
    viteReact(),
  ],
})

export default config
