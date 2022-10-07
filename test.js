import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { remark } from 'remark'
import { remarkObsidianLink } from './dist/index.js'

describe('with no opts', () => {
  const pre = (mdString) => remark().processSync(mdString).toString()
  const post = (mdString) =>
    remark().use(remarkObsidianLink).processSync(mdString).toString()

  it('returns a link with default toUri function', () => {
    assert.deepEqual(
      post('[[Wiki Link]]'),
      pre('[Wiki Link](/content/wiki-link)')
    )

    assert.deepEqual(
      post('[[Wiki Link|Alias Link]]'),
      pre('[Alias Link](/content/wiki-link)')
    )

    assert.deepEqual(
      post('[[#Internal Link]]'),
      pre('[#Internal Link](#internal-link)')
    )

    assert.deepEqual(
      post('[[Other Page#Internal Link]]'),
      pre('[Other Page#Internal Link](/content/other-page#internal-link)')
    )
  })
})

describe('with falsey toUri opt', () => {
  const pre = (mdString) => remark().processSync(mdString).toString()

  const toUri = () => ''
  const post = (mdString) =>
    remark().use(remarkObsidianLink, { toUri }).processSync(mdString).toString()

  it('returns text', () => {
    assert.deepEqual(post('[[Wiki Link]]'), pre('Wiki Link'))

    assert.deepEqual(post('[[Wiki Link|Alias Link]]'), pre('Alias Link'))

    assert.deepEqual(post('[[#Internal Link]]'), pre('#Internal Link'))

    assert.deepEqual(
      post('[[Other Page#Internal Link]]'),
      pre('Other Page#Internal Link')
    )
  })
})
