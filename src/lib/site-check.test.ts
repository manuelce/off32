import assert from 'node:assert/strict'
import { test } from 'node:test'
import { inspectPage, scoreOf, summarize, type Check } from './site-check'

const page = `<!doctype html><html><head>
<title>Ciao &amp; co</title>
<meta name="description" content="Una descrizione">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="canonical" href="https://esempio.it/">
<meta property="og:title" content="Ciao">
<meta property="og:description" content="Descrizione social">
</head><body>
<h1>Titolo</h1>
<img src="/a.jpg" alt="foto">
</body></html>`

test('una homepage completa prende 100', () => {
  const checks = inspectPage(page, 200, 'https://esempio.it/', false, 'text/html; charset=utf-8')
  assert.equal(scoreOf(checks), 100)
  assert.equal(checks.find(check => check.id === 'title')?.detail.includes('Ciao & co'), true)
  const summary = summarize({ score: 100, finalUrl: 'https://esempio.it/', checks })
  assert.equal('detail' in summary.checks[0], false)
})

test('i controlli mancanti abbassano solo il loro punteggio', () => {
  const html = page.replace('<title>Ciao &amp; co</title>', '<title></title>').replace('alt="foto"', '')
  const checks = inspectPage(html, 200, 'https://esempio.it/', false, 'text/html')
  assert.equal(checks.find(check => check.id === 'title')?.status, 'fail')
  assert.equal(checks.find(check => check.id === 'alt')?.status, 'fail')
  assert.equal(scoreOf(checks), 75)
})

test('un sito irraggiungibile non fa fallire i controlli non eseguiti', () => {
  const checks = inspectPage(page, 503, 'https://esempio.it/', false, 'text/html')
  assert.equal(checks.find(check => check.id === 'reachable')?.status, 'fail')
  assert.equal(checks.find(check => check.id === 'title')?.status, 'unavailable')
  assert.equal(scoreOf(checks), 50)
})

test('http senza redirect non passa il controllo https', () => {
  const checks = inspectPage(page, 200, 'http://esempio.it/', false, 'text/html')
  assert.equal(checks.find(check => check.id === 'https')?.status, 'fail')
})

test('una pagina troncata non trasforma i tag assenti in errori', () => {
  const partial = '<html><head><title>Ciao</title><meta name="viewport" content="width=device-width">'
  const checks = inspectPage(partial, 200, 'https://esempio.it/', true, 'text/html')
  assert.equal(checks.find(check => check.id === 'title')?.status, 'pass')
  assert.equal(checks.find(check => check.id === 'description')?.status, 'unavailable')
  assert.equal(checks.find(check => check.id === 'h1')?.status, 'unavailable')
  assert.equal(checks.find(check => check.id === 'alt')?.status, 'unavailable')
})

test('il punteggio ignora i controlli non disponibili', () => {
  const checks: Check[] = [
    { id: 'https', label: 'HTTPS', status: 'pass', max: 15, detail: '' },
    { id: 'title', label: 'Titolo', status: 'unavailable', max: 15, detail: '' },
  ]
  assert.equal(scoreOf(checks), 100)
})
