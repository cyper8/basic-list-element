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

/**
 * BasicListElement - web component based on LitElement class
 * that takes LightDOM children and adds them as selectable options
 * to list, maintained in ShadowDOM, tracks their selection status in
 * single and multiple select modes
 *
 * @export
 * @class BasicListElement
 * @extends {LitElement}
 *
 * @field label - descriptive label for items in the list
 * @type {String}
 * @default ""
 *
 * @field name - short name of the variable to hold the selection result
 * @type {String}
 * @default ""
 *
 * @field multiple - multiple selection mode
 * @type {Boolean}
 * @default false
 *
 * @field defaultSelectionIndex - indexes of items, selected by default
 * @attribute: 'default-selection-index'
 * @type {number[]}
 * @default []
 *
 * @readonly
 * @field selected - those of retrieved via LightDOM elements,
 *                   which are selected
 * @type {Element[]}
 *
 * @readonly
 * @field selectedIndexes - the same as previous, but indexes
 * @type {number[]}
 *
 */
export class BasicListElement extends LitElement {
  /**
   * ShadowDOM styles define custom style parameters:
   *
   * @param ```--ble-main-color```
   * @default '#777'
   *
   * @param ```--ble-secondary-color```
   * @default '#f9f9f9'
   *
   * @param ```--ble-bg-color```
   * @default 'transparent'
   *
   * @param ```--ble-text-color```
   * @default ---ble-main-color
   *
   * @param ```--ble-border-color```
   * @default ---ble-main-color
   *
   * @param ```--ble-selection-color```
   * @default '#00ccff'
   *
   * @param ```--ble-focus-color```
   * @default '#c5f3ff'
   *
   * @readonly
   * @static
   * @type {CSSResult[]}
   * @memberof BasicListElement
   */
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

  @property({ type: Array, attribute: 'default-selection-index' })
  defaultSelectionIndex: number[] = [];

  get selected(): Element[] {
    return this.selectedIndexes.map(i => this.items[i]);
  }

  get selectedIndexes(): number[] {
    return Array.from(this.__selectedIndexes);
  }

  private get slotChildren(): Element[] {
    const slot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot');
    return slot ? slot.assignedElements() : [];
  }

  @property({ type: Array })
  items: ReadOnlyArray<Element> = [];

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
    if (props.has('defaultSelectionIndex')) {
      this.__selectedIndexes = new Set();
      this.defaultSelectionIndex.forEach(i => this.selectItem(i));
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
          const children = this.slotChildren;
          if (children && children.length) {
            // Populate items from light DOM
            this.items = new ReadOnlyArray(Array.from(children));
            // clear selection
            this.__selectedIndexes = new Set();
            // Select the defaults
            this.defaultSelectionIndex.forEach(i => this.selectItem(i));
          }
        }}"
      ></slot>
    `;
  }
}
