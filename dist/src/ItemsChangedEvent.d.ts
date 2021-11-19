export declare type ItemsChangedDetail = {
  items: Element[];
};
export interface BLEItemsChangedEvent extends CustomEvent<ItemsChangedDetail> {
  detail: ItemsChangedDetail;
}
/**
 * Event that fires when basic-list-element items have been changed
 *
 * @export
 * @class ItemsChangedEvent
 * @extends {CustomEvent<ItemsChangedDetail>}
 * @implements {BLEItemsChangedEvent}
 */
export declare class ItemsChangedEvent
  extends CustomEvent<ItemsChangedDetail>
  implements BLEItemsChangedEvent
{
  static type: 'items-changed';
  /**
   *Creates an instance of ItemsChangedEvent
   * @param {ItemsChangedDetail} items - object that has 'items' entry with array of all Elements of a list
   * @param {CustomEventInit} [options={ bubbles: true, composed: true }] - other options of Event
   * @memberof ItemsChangedEvent
   */
  constructor(items: ItemsChangedDetail, options?: CustomEventInit);
}
