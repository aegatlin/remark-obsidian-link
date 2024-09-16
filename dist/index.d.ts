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
export declare const remarkObsidianLink: (opts?: {
    toLink?: ToLink;
}) => (tree: any) => void;
