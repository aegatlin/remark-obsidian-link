import m from 'mdast-builder';
import remarkWikiLink from 'remark-wiki-link';
import { SKIP, visit } from 'unist-util-visit';
export const remarkObsidianLink = function (opts) {
    const toLink = (opts === null || opts === void 0 ? void 0 : opts.toLink) || (({ value, alias }) => alias || value);
    this.use(remarkWikiLink, { aliasDivider: '|' });
    return (tree) => {
        visit(tree, 'wikiLink', (node, index, parent) => {
            const wValue = node.value;
            const wAlias = node.data.alias;
            const wikiLink = {
                value: wValue.trim(),
                alias: wAlias === wValue ? undefined : wAlias.trim(),
            };
            const link = toLink(wikiLink);
            const newNode = typeof link == 'string'
                ? m.text(link)
                : m.link(link.uri, link.title, [m.text(link.value)]);
            parent.children.splice(index, 1, newNode);
            return [SKIP, index];
        });
    };
};
