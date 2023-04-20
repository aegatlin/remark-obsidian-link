import m from "mdast-builder";
import remarkWikiLink from "remark-wiki-link";
import { SKIP, visit } from "unist-util-visit";

export interface WikiLink {
  value: string;
  alias?: string;
}

export interface Link {
  value: string;
  uri: string;
  title?: string;
}

export type ToLink = (wikiLink: WikiLink) => Link | string;

export const remarkObsidianLink = function (opts?: { toLink?: ToLink }) {
  const toLink: ToLink = opts?.toLink || (({ value, alias }) => alias || value);

  this.use(remarkWikiLink, { aliasDivider: "|" });

  return (tree) => {
    visit(tree, "wikiLink", (node, index, parent) => {
      const wValue = node.value;
      const wAlias = node.data.alias;
      const wikiLink: WikiLink = {
        value: wValue.trim(),
        alias: wAlias === wValue ? undefined : wAlias.trim(),
      };

      const link = toLink(wikiLink);

      const newNode =
        typeof link == "string"
          ? m.text(link)
          : m.link(link.uri, link.title, [m.text(link.value)]);

      parent.children.splice(index, 1, newNode);

      return [SKIP, index];
    });
  };
};
