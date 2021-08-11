export type SelectionChangedDetail = {
  elements: Element[];
  index: number[];
};

export interface BLESelectionChangedEvent
  extends CustomEvent<SelectionChangedDetail> {
  type: 'selection-changed';
  detail: SelectionChangedDetail;
}

export class SelectionChangedEvent
  extends CustomEvent<SelectionChangedDetail>
  implements BLESelectionChangedEvent
{
  static type: 'selection-changed' = 'selection-changed';

  // eslint-disable-next-line class-methods-use-this
  get type(): 'selection-changed' {
    return SelectionChangedEvent.type;
  }

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
    });
  }
}
