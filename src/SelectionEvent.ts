export class SelectionEvent extends CustomEvent<{ selection: any }> {
  constructor(selection: any) {
    super('selection-changed', {
      bubbles: true,
      composed: true,
      detail: {
        selection,
      },
    });
  }
}
