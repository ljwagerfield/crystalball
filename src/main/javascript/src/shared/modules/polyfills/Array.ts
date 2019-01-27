export function polyfillArray() {
  Object.defineProperty(Array.prototype, 'flatMap', {
    value: function(f: Function) {
      return this.reduce((ys: any, x: any) => {
        return ys.concat(f.call(this, x))
      }, [])
    },
    enumerable: false,
  });

  Object.defineProperty(Array.prototype, 'drop', {
    value: function(count: number) {
      return this.slice(count)
    },
    enumerable: false,
  });

  Object.defineProperty(Array.prototype, 'take', {
    value: function(count: number) {
      return this.slice(0, count)
    },
    enumerable: false,
  });

  Object.defineProperty(Array.prototype, 'reversePure', {
    value: function() {
      return this.slice().reverse();
    },
    enumerable: false,
  });

  Object.defineProperty(Array.prototype, 'sortPure', {
    value: function(compareFn?: (a: any, b: any) => number) {
      return this.slice().sort(compareFn);
    },
    enumerable: false,
  });
}