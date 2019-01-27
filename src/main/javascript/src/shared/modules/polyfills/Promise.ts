import Promise from "bluebird";

export function polyfillPromise(globalScope: any) {
  globalScope.Promise = Promise;
}