import { projectsResponseSchema } from '../../src/data/projectSchema.ts'

let fail = 0
const ok = (label: string, cond: boolean, extra = '') => {
  console.log(`  ${cond ? 'PASS' : 'FAIL'}  ${label}${extra ? ` — ${extra}` : ''}`)
  if (!cond) fail++
}

const project = {
  slug: 'loom',
  name: 'Loom',
  url: 'https://github.com/CodeByDylan/Loom',
  createdAt: '2026-07-30T03:45:41+00:00',
  archived: false,
  featured: true,
  weight: 0,
  description: 'Ten packages.',
  bannerUrl: 'https://opengraph.githubassets.com/1/CodeByDylan/Loom',
  bannerIsFallback: true,
  packages: [{ registry: 'nuget', id: 'CodeByDylan.Loom.Results', version: '0.3.2' }],
  languages: [{ name: 'C#', percent: 97 }],
  links: [{ url: 'https://example.com', label: 'Docs', labelNl: 'Documentatie' }],
  uses: [{ repo: 'Loom', note: 'Results.', slug: 'loom' }],
  usedBy: [],
  star: [],
}

const response = (...projects: unknown[]) => ({
  projects,
  refreshedAt: '2026-08-04T05:00:00+00:00',
  stale: false,
})

const parse = (body: unknown) => projectsResponseSchema.safeParse(body)

console.log('response contract:')
ok('a full project parses', parse(response(project)).success)
ok('no projects is valid', parse(response()).success)
ok('optional prose may be absent', parse(response({ ...project, story: undefined })).success)

console.log('\nbreaks worth stopping the build for:')
ok('missing slug rejected', !parse(response({ ...project, slug: undefined })).success)
ok('missing bannerIsFallback rejected', !parse(response({ ...project, bannerIsFallback: undefined })).success)
ok('wrong type rejected', !parse(response({ ...project, weight: '0' })).success)
ok('unknown registry rejected', !parse(response({ ...project, packages: [{ registry: 'npm', id: 'x' }] })).success)
ok('non-url rejected', !parse(response({ ...project, url: 'not-a-url' })).success)
ok('missing envelope rejected', !parse({ projects: [project] }).success)

console.log('\nforward compatible:')
const extra = parse(response({ ...project, somethingNew: true }))
ok('a new field is dropped, not fatal', extra.success)
ok('  and does not reach the site', extra.success && !('somethingNew' in extra.data.projects[0]))

console.log('\nboth locales survive the round trip:')
const bilingual = parse(
  response({
    ...project,
    descriptionNl: 'Tien pakketten.',
    star: [
      {
        title: 'T',
        situation: 's',
        task: 't',
        action: 'a',
        result: 'r',
        nl: { title: 'T-nl', situation: 's-nl', task: 't-nl', action: 'a-nl', result: 'r-nl' },
      },
    ],
  }),
)
ok('dutch description kept', bilingual.success && bilingual.data.projects[0].descriptionNl === 'Tien pakketten.')
ok('dutch star entry kept', bilingual.success && bilingual.data.projects[0].star[0].nl?.result === 'r-nl')

console.log(fail === 0 ? '\nall passed' : `\n${fail} FAILED`)
process.exit(fail === 0 ? 0 : 1)
