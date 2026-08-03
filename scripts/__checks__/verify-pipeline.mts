import { buildProject, deriveReverseEdges } from '../build-projects.mjs'

let fail = 0
const ok = (label: string, cond: boolean, extra = '') => {
  console.log(`  ${cond ? 'PASS' : 'FAIL'}  ${label}${extra ? ` — ${extra}` : ''}`)
  if (!cond) fail++
}

const FILES: Record<string, string> = {
  'Alpha/.dylan/meta.toml': `
featured = true
weight = 0
[[release.packages]]
registry = "nuget"
id = "Alpha.Core"
[[links]]
url = "https://example.com/docs"
label = "Docs"
label_nl = "Documentatie"
`,
  'Alpha/.dylan/description.md': '**Alpha** does things.',
  'Alpha/.dylan/star/1-x.md': '# Cut latency\n\n## situation\ns\n\n## task\nt\n\n## action\na\n\n## result\nr\n',
  'Alpha/.dylan/star/1-x.nl.md': '# Latentie omlaag\n\n## situation\ns-nl\n\n## task\nt-nl\n\n## action\na-nl\n\n## result\nr-nl\n',
  'Alpha/.dylan/story.md': 'It began on a Tuesday.',
  'Beta/.dylan/meta.toml': `
featured = false
[[uses]]
repo = "Alpha"
note = "core types"
`,
}

const LANGS: Record<string, Record<string, number>> = {
  Alpha: { 'C#': 417560, Shell: 12737 },
  Beta: {},
}

const realFetch = globalThis.fetch
globalThis.fetch = (async (input: string | URL) => {
  const url = String(input)
  const res = (body: string, status = 200, type = 'application/json') =>
    new Response(body, { status, headers: { 'content-type': type } })

  const contents = /repos\/[^/]+\/([^/]+)\/contents\/(.+)$/.exec(url)
  if (contents) {
    const [, repo, path] = contents
    if (path === '.dylan/star') {
      const names = Object.keys(FILES)
        .filter((k) => k.startsWith(`${repo}/.dylan/star/`))
        .map((k) => ({ type: 'file', name: k.split('/').pop() }))
      return names.length ? res(JSON.stringify(names)) : res('', 404)
    }
    const key = `${repo}/${path}`
    return key in FILES ? res(FILES[key], 200, 'text/plain') : res('', 404)
  }
  const langs = /repos\/[^/]+\/([^/]+)\/languages/.exec(url)
  if (langs) return res(JSON.stringify(LANGS[langs[1]] ?? {}))
  if (/\/tags/.test(url)) return res(JSON.stringify([{ name: 'v0.3.0' }, { name: 'v0.10.0' }]))
  if (url.includes('raw.githubusercontent.com')) return res('', 404) // no custom banner
  if (url.includes('opengraph.githubassets.com')) return res('PNGDATA', 200, 'image/png')
  if (url.includes('nuget.org')) return res(JSON.stringify({ versions: ['1.0.0', '1.2.0'] }))
  return res('', 404)
}) as typeof fetch

const repo = (name: string, extra: Record<string, unknown> = {}) => ({
  name,
  html_url: `https://github.com/CodeByDylan/${name}`,
  created_at: '2026-01-01T00:00:00Z',
  archived: false,
  description: 'api fallback description',
  homepage: '',
  ...extra,
})

console.log('end-to-end buildProject (network stubbed):')
const alpha = await buildProject(repo('Alpha'))
const beta = await buildProject(repo('Beta', { created_at: '2026-02-01T00:00:00Z' }))
const none = await buildProject(repo('NoDylan'))

ok('repo without .dylan is skipped', none === null)
ok('slug lowercased', alpha.slug === 'alpha')
ok('description.md wins over API description', alpha.description === '**Alpha** does things.')
ok('story read', alpha.story === 'It began on a Tuesday.')
ok('API description used when no description.md', beta.description === 'api fallback description')
ok('semver tag chosen', alpha.version === 'v0.10.0', String(alpha.version))
ok('languages percent', JSON.stringify(alpha.languages) === '[{"name":"C#","percent":97},{"name":"Shell","percent":3}]',
   JSON.stringify(alpha.languages))
ok('empty languages -> []', beta.languages.length === 0)
ok('banner fell back to social preview', alpha.bannerIsFallback === true && !!alpha.banner)
ok('nuget version resolved (last)', alpha.packages[0].version === '1.2.0', String(alpha.packages[0].version))
ok('localised link label', alpha.links[0].labelNl === 'Documentatie')
ok('STAR read from star/*.md', alpha.star.length === 1 && alpha.star[0].title === 'Cut latency')
ok('STAR Dutch variant paired', alpha.star[0].nl?.title === 'Latentie omlaag' && alpha.star[0].nl?.result === 'r-nl')
ok('project without star dir -> []', beta.star.length === 0)
ok('no wiki -> undefined', alpha.wiki === undefined)

console.log('\nderived reverse edges:')
deriveReverseEdges([alpha, beta])
ok('Beta declares uses Alpha', beta.uses[0].repo === 'Alpha' && beta.uses[0].slug === 'alpha')
ok('Alpha gains usedBy without declaring it', alpha.usedBy.length === 1 && alpha.usedBy[0].repo === 'Beta')
ok('Alpha declares no uses', alpha.uses.length === 0)

console.log('\nmalformed meta fails the build:')
FILES['Bad/.dylan/meta.toml'] = 'featurd = true'
let threw = ''
try {
  await buildProject(repo('Bad'))
} catch (e) {
  threw = (e as Error).message
}
ok('typo key throws naming repo+file', threw.includes('Bad/.dylan/meta.toml'), threw.slice(0, 90))

globalThis.fetch = realFetch
console.log(fail === 0 ? '\nall passed' : `\n${fail} FAILED`)
process.exit(fail === 0 ? 0 : 1)
