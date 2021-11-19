/**
 * SelectionChangedEvent fires when selected items of basic-list-element
 * have been changed
 *
 * @export
 * @class SelectionChangedEvent
 * @extends {CustomEvent<SelectionChangedDetail>}
 * @implements {BLESelectionChangedEvent}
 */
export class SelectionChangedEvent extends CustomEvent {
    /**
     * Creates an instance of SelectionChangedEvent
     *
     * @param {SelectionChangedDetail} selection - object that holds changed elements and their indexes
     * @param {CustomEventInit} [options = {
     *       bubbles: true,
     *       composed: true,
     *     }] - other options of the SelectionChangedEvent
     * @memberof SelectionChangedEvent
     */
    constructor(selection, options = {
        bubbles: true,
        composed: true,
    }) {
        super(SelectionChangedEvent.type, {
            ...options,
            detail: selection,
        });
    }
}
SelectionChangedEvent.type = 'selection-changed';
//# sourceMappingURL=SelectionChangedEvent.js.map