import assert from 'node:assert/strict'
import { test } from 'node:test'
import { isVercelAppHost } from './vercel-host'

test('gli host *.vercel.app non sono il dominio di produzione', () => {
  assert.equal(isVercelAppHost('off32.vercel.app'), true)
  assert.equal(isVercelAppHost('off32-git-seo.vercel.app'), true)
  assert.equal(isVercelAppHost('OFF32.VERCEL.APP:443'), true)
  assert.equal(isVercelAppHost('www.off32.it'), false)
  assert.equal(isVercelAppHost('off32.it'), false)
  assert.equal(isVercelAppHost('localhost:3000'), false)
  assert.equal(isVercelAppHost('notvercel.app'), false)
  assert.equal(isVercelAppHost('vercel.app.example.com'), false)
  assert.equal(isVercelAppHost(null), false)
  assert.equal(isVercelAppHost(''), false)
})
