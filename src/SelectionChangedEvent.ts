export type SelectionChangedDetail = {
  elements: Element[];
  index: number[];
};

export interface BLESelectionChangedEvent
  extends CustomEvent<SelectionChangedDetail> {
  detail: SelectionChangedDetail;
}

/**
 * SelectionChangedEvent fires when selected items of basic-list-element
 * have been changed
 *
 * @export
 * @class SelectionChangedEvent
 * @extends {CustomEvent<SelectionChangedDetail>}
 * @implements {BLESelectionChangedEvent}
 */
export class SelectionChangedEvent
  extends CustomEvent<SelectionChangedDetail>
  implements BLESelectionChangedEvent
{
  static type: 'selection-changed' = 'selection-changed';

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
  constructor(
    selection: SelectionChangedDetail,
    options: CustomEventInit = {
      bubbles: true,
      composed: true,
    }
  ) {
    super(SelectionChangedEvent.type, {
      ...options,
      detail: selection,
    } as CustomEventInit<SelectionChangedDetail>);
  }
}
