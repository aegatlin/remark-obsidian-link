import { Root as MdastRoot } from 'mdast'
import { wikiLinkToLink } from 'mdast-util-wiki-link-to-link'
import remarkWikiLink from 'remark-wiki-link'
import { Plugin } from 'unified'

export const remarkObsidianLink: Plugin<
  [{ toUri?: (s: string) => string }],
  MdastRoot
> = function (opts) {
  const toUri = opts?.toUri || _toUri

  this.use(remarkWikiLink, { aliasDivider: '|' })

  return (tree: MdastRoot) => {
    return wikiLinkToLink(tree, { toUri })
  }
}

function _toUri(s: string) {
  if (/^#/g.test(s)) {
    return s
  } else {
    return `/${s}`
  }
}
