export class SelectionEvent extends CustomEvent<{ selection: unknown }> {
  constructor(selection: unknown) {
    super('selection-changed', {
      bubbles: true,
      composed: true,
      detail: {
        selection,
      },
    });
  }
}
