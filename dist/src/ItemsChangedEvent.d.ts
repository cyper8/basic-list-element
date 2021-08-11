export declare type ItemsChangedDetail = {
  items: Element[];
};
export interface BLEItemsChangedEvent extends CustomEvent<ItemsChangedDetail> {
  type: 'items-changed';
  detail: ItemsChangedDetail;
}
export declare class ItemsChangedEvent
  extends CustomEvent<ItemsChangedDetail>
  implements BLEItemsChangedEvent
{
  static type: 'items-changed';
  get type(): 'items-changed';
  constructor(items: ItemsChangedDetail, options?: CustomEventInit);
}
