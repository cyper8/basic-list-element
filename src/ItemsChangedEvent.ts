export type ItemsChangedDetail = {
  items: Element[];
};

export interface BLEItemsChangedEvent extends CustomEvent<ItemsChangedDetail> {
  type: 'items-changed';
  detail: ItemsChangedDetail;
}

export class ItemsChangedEvent
  extends CustomEvent<ItemsChangedDetail>
  implements BLEItemsChangedEvent
{
  static type: 'items-changed' = 'items-changed';

  // eslint-disable-next-line class-methods-use-this
  get type(): 'items-changed' {
    return ItemsChangedEvent.type;
  }

  constructor(
    items: ItemsChangedDetail,
    options: CustomEventInit = { bubbles: true, composed: true }
  ) {
    super(ItemsChangedEvent.type, { ...options, detail: items });
  }
}
