import { __decorate } from "tslib";
import { html, css, LitElement, property, internalProperty, } from 'lit-element';
import { SelectionChangedEvent } from './SelectionEvent.js';
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
    constructor() {
        super(...arguments);
        this.label = '';
        this.name = '';
        this.multiple = false;
        this.defaultSelectionIndex = [];
        this.items = [];
        this.__selectedIndexes = new Set();
    }
    /**
     * ShadowDOM styles define custom style parameters:
     *
     * @param ```--ble-main-color```
     * @default '#555'
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
    static get styles() {
        return [
            resetBoxes,
            css `
        :host {
          --ble-main-color: #555;
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
    get selected() {
        return this.selectedIndexes.map(i => this.items[i]);
    }
    get selectedIndexes() {
        return Array.from(this.__selectedIndexes);
    }
    get slotChildren() {
        var _a;
        const slot = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('slot');
        return slot ? slot.assignedElements() : [];
    }
    selectItem(itemIndex) {
        if (!this.multiple)
            this.__selectedIndexes = new Set();
        this.__selectedIndexes.add(itemIndex);
        this.requestUpdate('selectedIndexes');
    }
    deselectItem(itemIndex) {
        this.__selectedIndexes.delete(itemIndex);
        this.requestUpdate('selectedIndexes');
    }
    toggleItemSelection(index) {
        if (this.__selectedIndexes.has(index)) {
            this.deselectItem(index);
        }
        else {
            this.selectItem(index);
        }
    }
    updated(props) {
        if (props.has('selectedIndexes')) {
            this.dispatchEvent(new SelectionChangedEvent({
                index: this.selectedIndexes,
                items: this.selected,
            }));
        }
        if (props.has('defaultSelectionIndex')) {
            this.__selectedIndexes = new Set();
            this.defaultSelectionIndex.forEach(i => this.selectItem(i));
        }
    }
    render() {
        return html `
      <div id="listlabel" class="label">${this.label}</div>
      <ul
        class="list"
        title="options list"
        aria-labelledby="listlabel"
        role="listbox"
        aria-multiselectable="${this.multiple}"
      >
        ${this.items.map((item, index) => html `
              <li
                role="option"
                class="item"
                tabindex="0"
                data-index="${index}"
                @click="${() => {
            this.toggleItemSelection(index);
        }}"
                @keydown="${(e) => {
            var _a, _b;
            const element = e.target;
            if (!element)
                return;
            if (e.key === ' ') {
                this.toggleItemSelection(index);
            }
            if (e.key === 'Enter') {
                this.selectItem(index);
            }
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                (_a = this.items[(index + 1) % this.items.length].parentElement) === null || _a === void 0 ? void 0 : _a.focus();
            }
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                const l = this.items.length;
                (_b = this.items[(l + index - 1) % l].parentElement) === null || _b === void 0 ? void 0 : _b.focus();
            }
        }}"
                aria-selected="${this.__selectedIndexes.has(index)}"
                ?selected="${this.__selectedIndexes.has(index)}"
              >
                ${item}
              </li>
            `)}
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
__decorate([
    property({ type: String })
], BasicListElement.prototype, "label", void 0);
__decorate([
    property({ type: String })
], BasicListElement.prototype, "name", void 0);
__decorate([
    property({ type: Boolean })
], BasicListElement.prototype, "multiple", void 0);
__decorate([
    property({ type: Array, attribute: 'default-selection-index' })
], BasicListElement.prototype, "defaultSelectionIndex", void 0);
__decorate([
    property({ type: Array })
], BasicListElement.prototype, "items", void 0);
__decorate([
    internalProperty()
], BasicListElement.prototype, "__selectedIndexes", void 0);
//# sourceMappingURL=BasicListElement.js.map