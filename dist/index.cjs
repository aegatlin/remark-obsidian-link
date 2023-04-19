var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// lib/index.ts
var lib_exports = {};
__export(lib_exports, {
  remarkObsidianLink: () => remarkObsidianLink
});
module.exports = __toCommonJS(lib_exports);
var import_mdast_builder = __toESM(require("mdast-builder"), 1);
var import_remark_wiki_link = __toESM(require("remark-wiki-link"), 1);
var import_unist_util_visit = require("unist-util-visit");
var remarkObsidianLink = function(opts) {
  const toLink = (opts == null ? void 0 : opts.toLink) || (({ value, alias }) => alias || value);
  this.use(import_remark_wiki_link.default, { aliasDivider: "|" });
  return (tree) => {
    (0, import_unist_util_visit.visit)(tree, "wikiLink", (node, index, parent) => {
      const wValue = node.value;
      const wAlias = node.data.alias;
      const wikiLink = {
        value: wValue.trim(),
        alias: wAlias === wValue ? void 0 : wAlias.trim()
      };
      const link = toLink(wikiLink);
      const newNode = typeof link == "string" ? import_mdast_builder.default.text(link) : import_mdast_builder.default.link(link.uri, link.title, [import_mdast_builder.default.text(link.value)]);
      parent.children.splice(index, 1, newNode);
      return [import_unist_util_visit.SKIP, index];
    });
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  remarkObsidianLink
});
