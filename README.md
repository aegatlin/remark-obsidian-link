# remark-obsidian-link

This lib turns Obsidian-style wiki-links to mdast-links. It uses [remark-wiki-link](https://www.npmjs.com/package/remark-wiki-link) internally to parse wiki-links from markdown, and then [visits](https://www.npmjs.com/package/unist-util-visit) each wiki-link node in the mdast and transforms it based on `toLink`.

```js
const toLink = (wikiLink) => ({
  value: wikiLink.value,
  uri: `/${wikiLink.value}`,
});

unified().use(remarkParse).use(remarkObsidianLink, { toLink });
```

## toLink option

`toLink` is an option that allows you to customize the transformation from wiki link to link.

The input is `WikiLink`, typed in TypeScript as `{ value: string, alias?: string }`.

The output is either `string` or `Link`, typed in TypeScript as `{ value: string, uri: string, title?: string }`. If the return is of type `string`, then the wiki link will be replaced by that string as **mdast-text**. It if returns a `Link` it will be replaced by an **mdast-link** with the appropriate values from `Link`.

By default `toLink` returns a string of `wikiLink.alias` if available, and `wikiLink.value` otherwise. This will effectively remove all wiki-links.
