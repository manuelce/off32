import assert from 'node:assert/strict'
import { test } from 'node:test'
import { isPublicAddress, parsePublicUrl } from './public-address'

test('accetta un dominio pubblico e forza https se manca lo schema', () => {
  const result = parsePublicUrl('example.com/pagina')
  assert.equal(result.ok, true)
  if (!result.ok) return
  assert.equal(result.url.protocol, 'https:')
  assert.equal(result.url.hostname, 'example.com')
  assert.equal(result.url.pathname, '/pagina')
  assert.equal(result.url.hash, '')
})

test('rifiuta destinazioni locali, riservate e offuscate', () => {
  const blocked = [
    'http://127.0.0.1',
    'http://2130706433',
    'http://0177.0.0.1',
    'http://0x7f000001',
    'http://127.1',
    'http://10.1.2.3',
    'http://172.16.0.1',
    'http://192.168.1.1',
    'http://169.254.169.254',
    'http://100.64.0.1',
    'http://0.0.0.0',
    'http://[::1]',
    'http://[::ffff:127.0.0.1]',
    'http://[fe80::1]',
    'http://[fc00::1]',
    'http://[2001:db8::1]',
    'http://localhost',
    'http://app.local',
    'http://printer.internal',
    'http://metadata.google.internal',
    'http://user:pass@example.com',
    'http://example.com:22',
    'file:///etc/passwd',
    'http://example.com:443',
  ]
  for (const input of blocked) {
    const result = parsePublicUrl(input)
    assert.equal(result.ok, false, input)
  }
})

test('accetta indirizzi pubblici letterali', () => {
  assert.equal(parsePublicUrl('https://1.1.1.1').ok, true)
  assert.equal(parsePublicUrl('https://8.8.8.8').ok, true)
  assert.equal(isPublicAddress('2001:4860:4860::8888'), true)
  assert.equal(isPublicAddress('::ffff:8.8.8.8'), true)
})

test('classifica le reti non pubbliche', () => {
  const blocked = ['10.0.0.1', '127.0.0.1', '169.254.1.1', '192.0.2.1', '198.51.100.1', '203.0.113.1', '224.0.0.1', '255.255.255.255', '::1', '::ffff:7f00:1', 'fe80::1', 'fd12::1', '64:ff9b::8.8.8.8']
  for (const ip of blocked) assert.equal(isPublicAddress(ip), false, ip)
  assert.equal(isPublicAddress('1.1.1.1'), true)
  assert.equal(isPublicAddress('8.8.4.4'), true)
})
