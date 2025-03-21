# remark-obsidian-link

This lib turns Obsidian-style wiki-links to mdast-links. It uses
[remark-wiki-link](https://www.npmjs.com/package/remark-wiki-link) internally to
parse wiki-links from markdown, and then
[visits](https://www.npmjs.com/package/unist-util-visit) each wiki-link node in
the mdast and transforms it based on `toLink`.

```js
const toLink = (wikiLink) => ({
  value: wikiLink.value,
  uri: `/${wikiLink.value}`,
})

unified().use(remarkParse).use(remarkObsidianLink, { toLink })
```

The purpose of this library is to create a simplified abstraction/wrapper around
`remark-wiki-link` for the simple use case of turning the mdast wiki link into
either mdast-text or mdast-link. Text is for when that link is not public, and
so should be rendered as mere text. Links are for when that linked page is
public and then `toLink` is intended to encapsulate the logic of what that link
should be (e.g., your website URL and path).

## Options

### toLink

`toLink` is an option that allows you to customize the transformation from wiki
link to link.

The input is `WikiLink`, typed in TypeScript as `{ value: string, alias?: string
}`.

The output is either `string` or `Link`, typed in TypeScript as `{ value:
string, uri: string, title?: string }`. If the return is of type `string`, then
the wiki link will be replaced by that string as **mdast-text**. If it returns a
`Link` it will be replaced by an **mdast-link** with the appropriate values from
`Link`.

By default `toLink` returns a string of `wikiLink.alias` if available, and
`wikiLink.value` otherwise. This will effectively remove all wiki-links.
