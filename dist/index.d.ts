import { Root as MdastRoot } from 'mdast';
import { Plugin } from 'unified';
export declare const remarkObsidianLink: Plugin<[
    {
        toUri?: (s: string) => string;
    }
], MdastRoot>;
