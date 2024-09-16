import { remarkObsidianLink } from './dist/index.js'
import { remark } from 'remark'

// Test with no params
remark().use(remarkObsidianLink)

// Test with empty params
remark().use(remarkObsidianLink, {})

// Test with full params
remark().use(remarkObsidianLink, {
  toLink: ({ value, alias }) => ({ value: 'v', uri: 'u', title: 't' }),
})

remark().use(remarkObsidianLink, {
  toLink: ({ value, alias }) => 's',
})

// Bad
//// when you uncomment these, they should show compiler warnings
// remark().use(remarkObsidianLink, { toLink: () => 4 })
// remark().use(remarkObsidianLink, { toLinks: () => 's' })
// remark().use(remarkObsidianLink, { idk: 4 })
