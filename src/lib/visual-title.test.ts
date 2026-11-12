import assert from 'node:assert/strict'
import { test } from 'node:test'
import { visualTitleLines } from './visual-title'

test('il testo ricostruito tiene gli spazi e i separatori originali', () => {
  const cases: Array<[string, readonly string[] | undefined, string]> = [
    ['AI Agents', undefined, 'AI Agents'],
    ['Performance & SEO', undefined, 'Performance & SEO'],
    ['Web Design / Development', undefined, 'Web Design / Development'],
    ['E-commerce', undefined, 'E-commerce'],
    ['Brand & Creative', [' & '], 'Brand & Creative'],
    ['AI Systems', [' & '], 'AI Systems'],
  ]
  for (const [label, delimiters, expected] of cases) {
    const { lines, separator } = visualTitleLines(label, delimiters)
    assert.equal(lines.join(separator), expected)
    assert.equal(lines.some(line => line.length === 0), false)
  }
})
