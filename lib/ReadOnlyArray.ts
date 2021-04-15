export class ReadOnlyArray<T> extends Array<T> {
  constructor(mutable: Iterable<T>) {
    super(0);
    this.push(...mutable);
    Object.freeze(this);
  }

  static get [Symbol.species](): ArrayConstructor {
    return Array;
  }
}
