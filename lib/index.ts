import slugify from '@sindresorhus/slugify'
import m from 'mdast-builder'
import remarkWikiLink from 'remark-wiki-link'
import { SKIP, visit } from 'unist-util-visit'

export interface WikiLink {
  value: string
  alias?: string
}

export interface Link {
  value: string
  uri: string
  title?: string
}

export type ToLink = (wikiLink: WikiLink) => Link | string

export const remarkObsidianLink = function (opts?: { toLink?: ToLink }) {
  const toLink: ToLink = opts?.toLink || _toLink

  this.use(remarkWikiLink, { aliasDivider: '|' })

  return (tree) => {
    visit(tree, 'wikiLink', (node, index, parent) => {
      const wValue = node.value
      const wAlias = node.data.alias
      const wikiLink: WikiLink = {
        value: wValue.trim(),
        alias: wAlias === wValue ? undefined : wAlias.trim(),
      }

      const link = toLink(wikiLink)

      const newNode =
        typeof link == 'string'
          ? m.text(link)
          : m.link(link.uri, link.title, [m.text(link.value)])

      parent.children.splice(index, 1, newNode)

      return [SKIP, index]
    })
  }
}

const _toSlug = (s: string): string => slugify(s, { decamelize: false })

const _Regex = {
  InternalHeader: /^#[^\^]+/,
  InternalBlock: /^#\^.+/,
  ExternalHeader: /.+#[^\^]+/,
  ExternalBlock: /.+#\^.+/,
}

const _toLink: ToLink = function _toLink({ value, alias }) {
  const aliasOr = (other: string): string => alias || other

  if (_Regex.InternalHeader.test(value)) {
    return {
      value: aliasOr(value.slice(1)),
      uri: `#${_toSlug(value)}`,
    }
  } else if (_Regex.InternalBlock.test(value)) {
    return aliasOr('')
  } else if (_Regex.ExternalHeader.test(value)) {
    const [a, b] = value.split('#')

    return {
      value: aliasOr(value),
      uri: `/content/${_toSlug(a)}#${_toSlug(b)}`,
    }
  } else if (_Regex.ExternalBlock.test(value)) {
    const [a, b] = value.split('#^')

    return {
      value: aliasOr(a),
      uri: `/content/${_toSlug(a)}`,
    }
  }

  return {
    value: aliasOr(value),
    uri: `/content/${_toSlug(value)}`,
  }
}
