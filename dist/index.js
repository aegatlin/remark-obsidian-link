import slugify from '@sindresorhus/slugify';
import { wikiLinkToLink } from 'mdast-util-wiki-link-to-link';
import remarkWikiLink from 'remark-wiki-link';
export const remarkObsidianLink = function (opts) {
    const toUri = (opts === null || opts === void 0 ? void 0 : opts.toUri) || _toUri;
    this.use(remarkWikiLink, { aliasDivider: '|' });
    return (tree) => {
        return wikiLinkToLink(tree, { toUri });
    };
};
const toSlug = (s) => slugify(s, { decamelize: false });
function _toUri(s) {
    if (/^#/g.test(s)) {
        return `#${toSlug(s)}`;
    }
    else if (/#/g.test(s)) {
        const [a, b] = s.split('#');
        return `/content/${toSlug(a)}#${toSlug(b)}`;
    }
    else {
        return `/content/${toSlug(s)}`;
    }
}
