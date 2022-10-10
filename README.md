# remark-obsidian-link

Do not use. This lib is still experimental.

## toLink

`toLink` is an option that allows you to customize the transformation from wiki link to link.

The input is `WikiLink`, typed in TypeScript as `{ value: string, alias?: string }`.

The output is either `string` or `Link`, typed in TypeScript as `{ value: string, uri: string, title?: string }`. If the return is of type `string`, then the wiki link will be replaced by that string as mdast-text. It if returns a `Link` it will be replaced by an mdast-link with the appropriate values from `Link`.

The default `toLink` behavior is articulated in the test-suite, see [test.js](./test.js) for details.
