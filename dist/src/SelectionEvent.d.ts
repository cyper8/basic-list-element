export interface BLESelectionChangedEvent extends CustomEvent<{
    items: Element[];
    index: number[];
}> {
    type: 'selection-changed';
    detail: {
        items: Element[];
        index: number[];
    };
}
export declare class SelectionChangedEvent extends CustomEvent<{
    items: Element[];
    index: number[];
}> implements BLESelectionChangedEvent {
    get type(): 'selection-changed';
    constructor(selection: {
        items: Element[];
        index: number[];
    }, options?: CustomEventInit);
}
