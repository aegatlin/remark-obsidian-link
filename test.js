import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { remark } from 'remark'
import { remarkObsidianLink } from './dist/index.js'

const oldProcess = (mdString) => remark().processSync(mdString).toString()
const newProcessNoOpts = (mdString) =>
  remark().use(remarkObsidianLink).processSync(mdString).toString()

describe('with a simple wiki link', () => {
  it('with no opts, returns regular link', () => {
    const actual = newProcessNoOpts('[[wow]]')
    const expected = oldProcess('[wow](/wow)')
    assert.deepEqual(actual, expected)
  })
})

describe('with aliased wiki link', () => {
  it('with no opts, returns an aliased link', () => {
    const actual = newProcessNoOpts('[[wow|neat]]')
    const expected = oldProcess('[neat](/wow)')
    assert.deepEqual(actual, expected)
  })

  it('with falsey toUri, returns alias text', () => {
    const newProcess = (mdString) =>
      remark()
        .use(remarkObsidianLink, { toUri: () => '' })
        .processSync(mdString)
        .toString()
    const actual = newProcess('[[wow|neat]]')
    const expected = oldProcess('neat')
    assert.deepEqual(actual, expected)
  })
})

describe('with an internal header link', () => {
  it('with no opts, returns a default link', () => {
    const actual = newProcessNoOpts('[[#wow]]')
    const expected = oldProcess('[#wow](#wow)')
    assert.deepEqual(actual, expected)
  })

  it('with falsey toUri, returns text', () => {
    const newProcess = (mdString) =>
      remark()
        .use(remarkObsidianLink, { toUri: () => '' })
        .processSync(mdString)
        .toString()

    const actual = newProcess('[[#wow]]')
    const expected = oldProcess('#wow')
    assert.deepEqual(actual, expected)
  })
})

describe('with an external header link', () => {
  it('with no opts, returns a link', () => {
    const actual = newProcessNoOpts('[[other#section]]')
    const expected = oldProcess('[other#section](/other#section)')
    assert.deepEqual(actual, expected)
  })
})
