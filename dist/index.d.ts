interface WikiLink {
    value: string;
    alias?: string;
}
interface Link {
    value: string;
    uri: string;
    title?: string;
}
declare type ToLink = (wikiLink: WikiLink) => Link | string;
declare const remarkObsidianLink: (opts?: {
    toLink?: ToLink;
}) => (tree: any) => void;

export { Link, ToLink, WikiLink, remarkObsidianLink };
