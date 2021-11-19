/**
 * Event that fires when basic-list-element items have been changed
 *
 * @export
 * @class ItemsChangedEvent
 * @extends {CustomEvent<ItemsChangedDetail>}
 * @implements {BLEItemsChangedEvent}
 */
export class ItemsChangedEvent extends CustomEvent {
    /**
     *Creates an instance of ItemsChangedEvent
     * @param {ItemsChangedDetail} items - object that has 'items' entry with array of all Elements of a list
     * @param {CustomEventInit} [options={ bubbles: true, composed: true }] - other options of Event
     * @memberof ItemsChangedEvent
     */
    constructor(items, options = { bubbles: true, composed: true }) {
        super(ItemsChangedEvent.type, { ...options, detail: items });
    }
}
ItemsChangedEvent.type = 'items-changed';
//# sourceMappingURL=ItemsChangedEvent.js.map