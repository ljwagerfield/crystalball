declare function require(moduleName: string): any;

export function polyfillFetch() {
  require("isomorphic-fetch");
}