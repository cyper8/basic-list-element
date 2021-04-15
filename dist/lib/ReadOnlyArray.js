export class ReadOnlyArray extends Array {
    constructor(mutable) {
        super(0);
        this.push(...mutable);
        Object.freeze(this);
    }
    static get [Symbol.species]() {
        return Array;
    }
}
//# sourceMappingURL=ReadOnlyArray.js.map