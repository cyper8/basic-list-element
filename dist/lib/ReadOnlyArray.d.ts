export declare class ReadOnlyArray<T> extends Array<T> {
  constructor(mutable: Iterable<T>);
  static get [Symbol.species](): ArrayConstructor;
}
