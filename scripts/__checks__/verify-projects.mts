import { parse as toml } from 'smol-toml'
import { compareProjects, latestTag, metaSchema, parseStarFile, slugify, UNSET_WEIGHT } from '../../src/data/projectSchema.ts'

let fail = 0
const ok = (label: string, cond: boolean, extra = '') => {
  console.log(`  ${cond ? 'PASS' : 'FAIL'}  ${label}${extra ? ` — ${extra}` : ''}`)
  if (!cond) fail++
}

console.log('semver tag selection (GitHub returns commit order):')
ok('picks highest, not first', latestTag([{name:'v0.3.0'},{name:'v0.10.0'},{name:'v0.9.1'}]) === 'v0.10.0',
   String(latestTag([{name:'v0.3.0'},{name:'v0.10.0'},{name:'v0.9.1'}])))
ok('late-pushed old tag does not win', latestTag([{name:'v2.0.0'},{name:'v1.0.0'}]) === 'v2.0.0')
ok('non-semver falls back to first', latestTag([{name:'nightly'}]) === 'nightly')
ok('no tags -> undefined', latestTag([]) === undefined)

console.log('\nslugs:')
ok('ResourcePackIdentifier', slugify('ResourcePackIdentifier') === 'resourcepackidentifier')
ok('dots and dashes', slugify('Loom.Results-v2') === 'loom-results-v2', slugify('Loom.Results-v2'))

console.log('\nschema — strict on structure:')
const good = metaSchema.safeParse(toml(`featured = true\nweight = 5`))
ok('valid parses', good.success)
ok('defaults applied', good.success && good.data.release.packages.length === 0 && good.data.links.length === 0)
ok('unset weight = 1000', metaSchema.parse(toml('featured = true')).weight === UNSET_WEIGHT)
ok('typo key rejected', !metaSchema.safeParse(toml('featurd = true')).success)
ok('wrong type rejected', !metaSchema.safeParse(toml('featured = "yes"')).success)
ok('bad registry rejected', !metaSchema.safeParse(toml(`[[release.packages]]\nregistry="npm"\nid="x"`)).success)
ok('bad url rejected', !metaSchema.safeParse(toml(`[[links]]\nurl="notaurl"\nlabel="L"`)).success)

console.log('\nordering (weight asc, newest first on ties):')
const mk = (weight: number, createdAt: string) => ({ weight, createdAt })
const sorted = [mk(1000,'2026-01-01'), mk(0,'2020-01-01'), mk(1000,'2026-08-01'), mk(5,'2019-01-01')]
  .sort(compareProjects).map(p => `${p.weight}/${p.createdAt.slice(0,4)}`)
ok('weight wins over recency', sorted[0] === '0/2020', sorted.join(' '))
ok('unweighted newest first', sorted[2] === '1000/2026' && sorted[3] === '1000/2026')
ok('explicit weight beats unset', sorted[1] === '5/2019')


console.log("\nSTAR markdown parsing:")
const goodStar = "# Title here\n\n## situation\ns\n\n## task\nt\n\n## action\na\n\n## result\nr\n"
const parsed = parseStarFile(goodStar, "x.md")
ok("title from h1", parsed.title === "Title here")
ok("all four fields", parsed.situation==="s" && parsed.task==="t" && parsed.action==="a" && parsed.result==="r")
ok("multi-paragraph body kept", parseStarFile(goodStar.replace("\ns\n","\nline one\n\nline two\n"),"x.md").situation === "line one\n\nline two")
const throws = (md: string) => { try { parseStarFile(md,"x.md"); return "" } catch (e) { return (e as Error).message } }
ok("missing h1 rejected", throws(goodStar.replace("# Title here","")).includes("missing the"))
ok("missing section rejected", throws(goodStar.replace(/## result[\s\S]*$/,"")).includes("result"))
ok("empty section rejected", throws(goodStar.replace("## task\nt","## task\n")).includes("task"))
ok("unknown section rejected", throws(goodStar + "\n## bogus\nx\n").includes("bogus"))
ok("dutch headings stay machine keys", parseStarFile("# Titel\n\n## situation\nsituatie\n\n## task\ntaak\n\n## action\nactie\n\n## result\nresultaat\n","x.md").result === "resultaat")
ok("star no longer allowed in meta.toml", !metaSchema.safeParse({ star: [] }).success)

console.log(fail === 0 ? "\nall passed" : `\n${fail} FAILED`)
process.exit(fail === 0 ? 0 : 1)
