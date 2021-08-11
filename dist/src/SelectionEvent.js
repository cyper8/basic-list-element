export class SelectionChangedEvent extends CustomEvent {
    constructor(selection, options = {
        bubbles: true,
        composed: true,
    }) {
        super(SelectionChangedEvent.type, {
            ...options,
            detail: selection,
        });
    }
    // eslint-disable-next-line class-methods-use-this
    get type() {
        return SelectionChangedEvent.type;
    }
}
SelectionChangedEvent.type = 'selection-changed';
//# sourceMappingURL=SelectionEvent.js.map