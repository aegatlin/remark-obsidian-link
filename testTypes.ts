import { remarkObsidianLink } from './dist/index.js'
import { remark } from 'remark'

// Test with no params
remark().use(remarkObsidianLink)

// Test with empty params
remark().use(remarkObsidianLink, {})

// Test with full params
remark().use(remarkObsidianLink, { toUri: (s) => s })
