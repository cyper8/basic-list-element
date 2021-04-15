export class SelectionChangedEvent extends CustomEvent {
    // eslint-disable-next-line class-methods-use-this
    get type() {
        return 'selection-changed';
    }
    constructor(selection, options = {
        bubbles: true,
        composed: true,
    }) {
        super('selection-changed', {
            ...options,
            detail: selection,
        });
    }
}
//# sourceMappingURL=SelectionEvent.js.map