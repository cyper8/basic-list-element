export interface BLESelectionChangedEvent
  extends CustomEvent<{ items: Element[]; index: number[] }> {
  type: 'selection-changed';
  detail: {
    items: Element[];
    index: number[];
  };
}

export class SelectionChangedEvent
  extends CustomEvent<{
    items: Element[];
    index: number[];
  }>
  implements BLESelectionChangedEvent
{
  // eslint-disable-next-line class-methods-use-this
  get type(): 'selection-changed' {
    return 'selection-changed';
  }

  constructor(
    selection: { items: Element[]; index: number[] },
    options: CustomEventInit = {
      bubbles: true,
      composed: true,
    }
  ) {
    super('selection-changed', {
      ...options,
      detail: selection,
    });
  }
}
