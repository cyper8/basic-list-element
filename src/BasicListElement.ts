import { html, css, LitElement, property, internalProperty } from 'lit-element';
import { SelectionEvent } from './SelectionEvent.js';
import { resetBoxes } from './reset-styles.js';
import { ReadOnlyArray } from '../lib/ReadOnlyArray.js';

export class BasicListElement extends LitElement {
  static get styles() {
    return [
      resetBoxes,
      css`
        :host {
          --ble-main-color: #777;
          --ble-secondary-color: #f9f9f9;
          --ble-bg-color: transparent;
          --ble-text-color: var(--ble-main-color);
          --ble-border-color: var(--ble-main-color);
          --ble-selection-color: #00ccff;
          --ble-focus-color: #c5f3ff;
          display: block;
          color: var(--ble-text-color);
          position: relative;
          background-color: var(--ble-bg-color);
        }

        .list {
          /* display: grid;
          grid-template-areas: 'ul'; */
          margin: 0.3em;
          padding: 0;
          width: 100%;
          /* border: 1px solid var(--ble-border-color); */
          /* font-size: 1.25rem; */
          cursor: pointer;
          line-height: 1.1;
          background-color: var(--ble-secondary-color);
          /* align-items: center; */
          list-style-type: none;
        }

        .item {
          display: block;
          padding: 0.5em 1em;
        }

        .item:focus,
        .item:hover {
          outline: none;
          background-color: var(--ble-focus-color);
        }

        .item[selected] {
          font-weight: bold;
          background-color: var(--ble-selection-color);
        }
      `,
    ];
  }

  @property({ type: String })
  label: string = '';

  @property({ type: String })
  name: string = '';

  @property({ type: Boolean })
  multiple: boolean = false;

  @property({ type: Array })
  defaultSelectionIndex: number[] = [];

  get selected(): Element[] {
    return this.selectedIndexes.map(i => this.__items[i]);
  }

  get selectedIndexes(): number[] {
    return Array.from(this.__selectedIndexes);
  }

  @internalProperty()
  private readonly __items: ReadOnlyArray<Element> = [];

  @internalProperty()
  private __selectedIndexes: Set<number> = new Set();

  private __selectItem(itemIndex: number) {
    if (!this.multiple) this.__selectedIndexes = new Set();
    this.__selectedIndexes.add(itemIndex);
    this.requestUpdate('selectedIndexes');
  }

  private __deselectItem(itemIndex: number) {
    this.__selectedIndexes.delete(itemIndex);
    this.requestUpdate('selectedIndexes');
  }

  private __toggleItemSelection(index: number) {
    if (this.__selectedIndexes.has(index)) {
      this.__deselectItem(index);
    } else {
      this.__selectItem(index);
    }
  }

  constructor() {
    super();
    // Populate items from light DOM
    this.__items = new ReadOnlyArray(Array.from(this.children));
    // Select the defaults
    this.defaultSelectionIndex.forEach(i => this.__selectedIndexes.add(i));
  }

  updated(props: Map<keyof BasicListElement, any>) {
    if (props.has('selectedIndexes')) {
      this.dispatchEvent(
        new SelectionEvent({
          index: this.selectedIndexes,
          items: this.selected,
        })
      );
    }
  }

  render() {
    return html`
      <div id="listlabel" class="label">${this.label}</div>
      <ul
        class="list"
        title="options list"
        aria-labelledby="listlabel"
        role="listbox"
      >
        ${this.__items.map(
          (item, index) =>
            html`
              <li
                role="option"
                class="item"
                tabindex="0"
                data-index="${index}"
                @click="${() => {
                  this.__toggleItemSelection(index);
                }}"
                @keydown="${(e: KeyboardEvent) => {
                  const element: HTMLElement | null = e.target as HTMLElement;
                  if (!element) return;
                  if (e.key === ' ') {
                    this.__toggleItemSelection(index);
                  }
                  if (e.key === 'Enter') {
                    this.__selectItem(index);
                  }
                  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    this.__items[
                      (index + 1) % this.__items.length
                    ].parentElement?.focus();
                  }
                  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    const l = this.__items.length;
                    this.__items[(l + index - 1) % l].parentElement?.focus();
                  }
                }}"
                aria-selected="${this.__selectedIndexes.has(index)}"
                ?selected="${this.__selectedIndexes.has(index)}"
              >
                ${item}
              </li>
            `
        )}
      </ul>
    `;
  }
}
