import Promise from "bluebird";
import {polyfillFetch} from "shared/modules/polyfills/Fetch";
import {polyfillPromise} from "shared/modules/polyfills/Promise";
import {polyfillArray} from "shared/modules/polyfills/Array";

function configModules() {
  configBluebird();
}

function configBluebird() {
  Promise.config({
    warnings: {
      // When a method returns "undefined" - for example `.then(() => undefined)` - Bluebird will issue a warning
      // each time a promise gets created inside that stack frame. Unfortunately, when calling things like `dispatch` from
      // inside a `.then(...)`, Bluebird will issue warnings if this triggers promises to be created by other components on
      // state update, for example, if they happen to render before the method completes.
      wForgottenReturn: false
    }
  });
}

function polyfill() {
  let globalScope: any;
  if (typeof window !== "undefined")
    globalScope = window;
  else if (typeof global !== "undefined")
    globalScope = global;
  else
    throw new Error("Cannot find global scope!");

  polyfillPromise(globalScope);

  // Must go after the `Promise` polyfill, because the `fetch` modules grab references to current `Promise` on initialize.
  polyfillFetch();

  polyfillArray();
}

export function initializeModules() {
  configModules();
  polyfill();
}