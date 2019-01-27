interface Array<T> {
  flatMap<E>(callback: (t: T) => Array<E>): Array<E>
  take(count: number): Array<T>
  drop(count: number): Array<T>
  reversePure(): Array<T>
  sortPure(compareFn?: (a: T, b: T) => number): Array<T>
}