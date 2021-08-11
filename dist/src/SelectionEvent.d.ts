export declare type SelectionChangedDetail = {
  elements: Element[];
  index: number[];
};
export interface BLESelectionChangedEvent
  extends CustomEvent<SelectionChangedDetail> {
  type: 'selection-changed';
  detail: SelectionChangedDetail;
}
export declare class SelectionChangedEvent
  extends CustomEvent<SelectionChangedDetail>
  implements BLESelectionChangedEvent
{
  static type: 'selection-changed';
  get type(): 'selection-changed';
  constructor(selection: SelectionChangedDetail, options?: CustomEventInit);
}
