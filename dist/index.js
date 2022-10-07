import { wikiLinkToLink } from 'mdast-util-wiki-link-to-link';
import remarkWikiLink from 'remark-wiki-link';
export const remarkObsidianLink = function (opts) {
    const toUri = (opts === null || opts === void 0 ? void 0 : opts.toUri) || _toUri;
    this.use(remarkWikiLink, { aliasDivider: '|' });
    return (tree) => {
        return wikiLinkToLink(tree, { toUri });
    };
};
function _toUri(s) {
    if (/^#/g.test(s)) {
        return s;
    }
    else {
        return `/${s}`;
    }
}
