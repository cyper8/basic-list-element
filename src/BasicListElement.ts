import {
  html,
  css,
  LitElement,
  property,
  internalProperty,
  CSSResult,
  TemplateResult,
} from 'lit-element';
import { SelectionEvent } from './SelectionEvent.js';
import { resetBoxes } from './reset-styles.js';
import { ReadOnlyArray } from '../lib/ReadOnlyArray.js';

export class BasicListElement extends LitElement {
  static get styles(): CSSResult[] {
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
  label = '';

  @property({ type: String })
  name = '';

  @property({ type: Boolean })
  multiple = false;

  @property({ type: Array })
  defaultSelectionIndex: number[] = [];

  get selected(): Element[] {
    return this.selectedIndexes.map(i => this.items[i]);
  }

  get selectedIndexes(): number[] {
    return Array.from(this.__selectedIndexes);
  }

  private get __slotChildren(): Element[] {
    const slot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot');
    return slot ? slot.assignedElements() : [];
  }

  @internalProperty()
  private items: ReadOnlyArray<Element> = [];

  @internalProperty()
  private __selectedIndexes: Set<number> = new Set();

  private selectItem(itemIndex: number) {
    if (!this.multiple) this.__selectedIndexes = new Set();
    this.__selectedIndexes.add(itemIndex);
    this.requestUpdate('selectedIndexes');
  }

  private deselectItem(itemIndex: number) {
    this.__selectedIndexes.delete(itemIndex);
    this.requestUpdate('selectedIndexes');
  }

  private toggleItemSelection(index: number) {
    if (this.__selectedIndexes.has(index)) {
      this.deselectItem(index);
    } else {
      this.selectItem(index);
    }
  }

  updated(props: Map<keyof BasicListElement, unknown>): void {
    if (props.has('selectedIndexes')) {
      this.dispatchEvent(
        new SelectionEvent({
          index: this.selectedIndexes,
          items: this.selected,
        })
      );
    }
  }

  render(): TemplateResult {
    return html`
      <div id="listlabel" class="label">${this.label}</div>
      <ul
        class="list"
        title="options list"
        aria-labelledby="listlabel"
        role="listbox"
        aria-multiselectable="${this.multiple}"
      >
        ${this.items.map(
          (item, index) =>
            html`
              <li
                role="option"
                class="item"
                tabindex="0"
                data-index="${index}"
                @click="${() => {
                  this.toggleItemSelection(index);
                }}"
                @keydown="${(e: KeyboardEvent) => {
                  const element: HTMLElement | null = e.target as HTMLElement;
                  if (!element) return;
                  if (e.key === ' ') {
                    this.toggleItemSelection(index);
                  }
                  if (e.key === 'Enter') {
                    this.selectItem(index);
                  }
                  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    this.items[
                      (index + 1) % this.items.length
                    ].parentElement?.focus();
                  }
                  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    const l = this.items.length;
                    this.items[(l + index - 1) % l].parentElement?.focus();
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
      <slot
        @slotchange="${() => {
          const children = this.__slotChildren;
          if (children && children.length) {
            // Populate items from light DOM
            this.items = new ReadOnlyArray(Array.from(children));
            // Select the defaults
            this.defaultSelectionIndex.forEach(i =>
              this.__selectedIndexes.add(i)
            );
          }
        }}"
      ></slot>
    `;
  }
}
