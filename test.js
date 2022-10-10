import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { remark } from 'remark'
import { remarkObsidianLink } from './dist/index.js'

describe('with no opts', () => {
  const pre = (mdString) => remark().processSync(mdString).toString()
  const post = (mdString) =>
    remark().use(remarkObsidianLink).processSync(mdString).toString()

  it('returns links with default toLink transform', () => {
    assert.deepEqual(
      post('[[Wiki Link]]'),
      pre('[Wiki Link](/content/wiki-link)')
    )

    assert.deepEqual(
      post('[[Wiki Link|Alias Link]]'),
      pre('[Alias Link](/content/wiki-link)')
    )

    assert.deepEqual(
      post('[[Wiki Link | Alias Link]]'),
      pre('[Alias Link](/content/wiki-link)')
    )

    assert.deepEqual(
      post('[[Wiki Link| Alias Link]]'),
      pre('[Alias Link](/content/wiki-link)')
    )

    assert.deepEqual(
      post('[[Wiki Link |Alias Link]]'),
      pre('[Alias Link](/content/wiki-link)')
    )

    assert.deepEqual(
      post('[[#Internal Link]]'),
      pre('[Internal Link](#internal-link)')
    )

    assert.deepEqual(
      post('[[#Internal Link | Alias]]'),
      pre('[Alias](#internal-link)')
    )

    assert.deepEqual(post('[[#^internal-block]]'), pre(''))

    assert.deepEqual(post('[[#^internal-block|Alias]]'), pre('Alias'))

    assert.deepEqual(post('[[#^internal-block | Alias]]'), pre('Alias'))

    assert.deepEqual(
      post('[[Other Page#Internal Link]]'),
      pre('[Other Page#Internal Link](/content/other-page#internal-link)')
    )

    assert.deepEqual(
      post('[[Other Page#Internal Link|Alias]]'),
      pre('[Alias](/content/other-page#internal-link)')
    )

    assert.deepEqual(
      post('[[Other Page#^block]]'),
      pre('[Other Page](/content/other-page)')
    )
  })
})

describe('with simple, custom toLink opt', () => {
  const pre = (mdString) => remark().processSync(mdString).toString()

  const post = (mdString) =>
    remark()
      .use(remarkObsidianLink, {
        toLink: ({ value, alias }) => alias || value,
      })
      .processSync(mdString)
      .toString()

  it('returns text', () => {
    assert.deepEqual(post('[[Wiki Link]]'), pre('Wiki Link'))

    assert.deepEqual(post('[[Wiki Link|Alias Link]]'), pre('Alias Link'))

    assert.deepEqual(
      post('[[Wiki Link | Alias Link With Space]]'),
      pre('Alias Link With Space')
    )

    assert.deepEqual(post('[[#Internal Link]]'), pre('#Internal Link'))

    assert.deepEqual(post('[[#Internal Link | Alias]]'), pre('Alias'))

    assert.deepEqual(
      post('[[Other Page#Internal Link]]'),
      pre('Other Page#Internal Link')
    )

    assert.deepEqual(post('[[Other Page#^block]]'), pre('Other Page#^block'))
  })
})
