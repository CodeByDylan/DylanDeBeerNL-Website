import { readFileSync } from 'node:fs'

const MARKERS = ['<!-- COMMITS:START -->', '<!-- COMMITS:END -->']

/** Rewrites the marked commit section of a PR body; appends it when absent. */
const [bodyPath, commitsPath] = process.argv.slice(2)
const body = readFileSync(bodyPath, 'utf8')
const commits = readFileSync(commitsPath, 'utf8').trim()

const count = commits ? commits.split('\n').length : 0
const section = `${MARKERS[0]}\n## Commits (${count})\n${commits}\n${MARKERS[1]}`
const pattern = new RegExp(`${MARKERS[0]}[\\s\\S]*?${MARKERS[1]}`)

process.stdout.write(
  pattern.test(body)
    ? body.replace(pattern, () => section)
    : `${body.trimEnd()}\n\n${section}\n`,
)
