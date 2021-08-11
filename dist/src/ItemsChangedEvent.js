export class ItemsChangedEvent extends CustomEvent {
    constructor(items, options = { bubbles: true, composed: true }) {
        super(ItemsChangedEvent.type, { ...options, detail: items });
    }
    // eslint-disable-next-line class-methods-use-this
    get type() {
        return ItemsChangedEvent.type;
    }
}
ItemsChangedEvent.type = 'items-changed';
//# sourceMappingURL=ItemsChangedEvent.js.map