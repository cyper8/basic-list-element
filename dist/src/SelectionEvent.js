export class SelectionEvent extends CustomEvent {
    constructor(selection) {
        super('selection-changed', {
            bubbles: true,
            composed: true,
            detail: {
                selection,
            },
        });
    }
}
//# sourceMappingURL=SelectionEvent.js.map