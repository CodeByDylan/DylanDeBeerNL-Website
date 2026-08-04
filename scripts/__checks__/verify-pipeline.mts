import { fetchProjects, toProject } from '../build-projects.mjs'

let fail = 0
const ok = (label: string, cond: boolean, extra = '') => {
  console.log(`  ${cond ? 'PASS' : 'FAIL'}  ${label}${extra ? ` — ${extra}` : ''}`)
  if (!cond) fail++
}

const PROJECT = {
  slug: 'alpha',
  name: 'Alpha',
  url: 'https://github.com/CodeByDylan/Alpha',
  createdAt: '2026-01-01T00:00:00+00:00',
  archived: false,
  featured: true,
  weight: 0,
  description: '**Alpha** does things.',
  bannerUrl: 'https://opengraph.githubassets.com/1/CodeByDylan/Alpha',
  bannerIsFallback: true,
  packages: [],
  languages: [{ name: 'C#', percent: 100 }],
  links: [],
  uses: [],
  usedBy: [],
  star: [],
}

const realFetch = globalThis.fetch
const seen: { url: string; headers: Record<string, string> }[] = []

/** Answers as the API and the banner host would, recording what was asked of each. */
function stub({
  status = 200,
  body = { projects: [PROJECT], refreshedAt: 'now', stale: false } as unknown,
  banner = 'image/png',
} = {}) {
  globalThis.fetch = (async (input: string | URL, init?: RequestInit) => {
    const url = String(input)
    seen.push({ url, headers: (init?.headers ?? {}) as Record<string, string> })

    if (url.includes('githubassets.com')) {
      return banner
        ? new Response('PNGDATA', { status: 200, headers: { 'content-type': banner } })
        : new Response('', { status: 404 })
    }
    return new Response(JSON.stringify(body), {
      status,
      headers: { 'content-type': 'application/json' },
    })
  }) as typeof fetch
}

const failure = async (run: () => Promise<unknown>) => {
  try {
    await run()
    return ''
  } catch (error) {
    return (error as Error).message
  }
}

process.env.PROJECTS_API_URL = 'https://api.example.test'

console.log('reading from the API:')
stub()
seen.length = 0
const { projects } = await fetchProjects()
ok('calls /v1/projects', seen[0]?.url === 'https://api.example.test/v1/projects', seen[0]?.url)
ok('the project comes through', projects.length === 1 && projects[0].slug === 'alpha')
ok('no refresh headers without a secret', !('X-Refresh-Token' in (seen[0]?.headers ?? {})))

console.log('\nbanners are downloaded, never embedded:')
stub()
seen.length = 0
const built = await toProject(PROJECT)
ok('rewritten to a local path', built.banner === '/images/projects/alpha.png', String(built.banner))
ok('bannerUrl does not survive the build', !('bannerUrl' in built))
ok('the image host was actually fetched', seen.some((r) => r.url.includes('githubassets.com')))
ok('bannerIsFallback is kept as the API reported it', built.bannerIsFallback === true)

stub({ banner: '' })
ok('a failed download leaves it unset', (await toProject(PROJECT)).banner === undefined)

stub({ banner: 'text/html' })
ok('a non-image is refused', (await toProject(PROJECT)).banner === undefined)

console.log('\nthe build fails loudly:')
stub({ status: 503 })
ok('on a non-200', (await failure(fetchProjects)).includes('503'))

stub({ body: { projects: [{ slug: 'alpha' }], refreshedAt: 'now', stale: false } })
ok('on an unexpected shape', (await failure(fetchProjects)).includes('unexpected response shape'))

globalThis.fetch = (() => Promise.reject(new Error('ECONNREFUSED'))) as unknown as typeof fetch
ok('on an unreachable API', (await failure(fetchProjects)).includes('could not be reached'))

delete process.env.PROJECTS_API_URL
ok('when the URL is unset', (await failure(fetchProjects)).includes('PROJECTS_API_URL'))

console.log('\nforcing a refresh:')
// Without the forced refresh a deploy can publish data up to the API's TTL old, which is the wait a
// deploy exists to end.
process.env.PROJECTS_API_URL = 'https://api.example.test'
process.env.PROJECTS_REFRESH_SECRET = 's3cret'
stub()
seen.length = 0
await fetchProjects()
ok('sends no-cache', seen[0]?.headers['Cache-Control'] === 'no-cache')
ok('sends the secret', seen[0]?.headers['X-Refresh-Token'] === 's3cret')

globalThis.fetch = realFetch
console.log(fail === 0 ? '\nall passed' : `\n${fail} FAILED`)
process.exit(fail === 0 ? 0 : 1)
