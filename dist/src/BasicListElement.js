import { __decorate } from "tslib";
import { html, css, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { SelectionChangedEvent } from './SelectionChangedEvent.js';
import { resetBoxes } from './reset-boxes-style.js';
import { BLEStyle } from './ble-style.js';
import { ReadOnlyArray } from '../lib/ReadOnlyArray.js';
import { ItemsChangedEvent } from './ItemsChangedEvent.js';
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
 * @readonly
 * @field items - immutable array of elements rendered into list items
 * @type {Element[]}
 *
 * @readonly
 * @field selected - those of retrieved via LightDOM elements,
 *                   which are selected
 * @type {Element[]}
 *
 * @field selectedIndexes - sets or gets index of currently selected items
 * @type {number[]}
 *
 */
export class BasicListElement extends LitElement {
    constructor() {
        super(...arguments);
        this.label = '';
        this.name = '';
        this.multiple = false;
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
      `,
            BLEStyle,
        ];
    }
    get selected() {
        return this.selectedIndexes.map(i => this.items[i]);
    }
    set selectedIndexes(indexes) {
        this.__selectedIndexes = new Set(!this.multiple ? indexes.slice(0, 1) : [...indexes]);
        this.requestUpdate('selectedIndexes');
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
                elements: this.selected,
            }));
        }
        if (props.has('items')) {
            this.dispatchEvent(new ItemsChangedEvent({ items: this.items }));
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
        ${this.items.map((item, index, items) => html `
              <li
                role="option"
                class="item"
                tabindex="0"
                data-index="${index}"
                @click="${(e) => {
            e.stopPropagation();
            this.toggleItemSelection(index);
        }}"
                @keydown="${(e) => {
            var _a, _b;
            e.stopPropagation();
            if (e.key === ' ') {
                // Space Bar
                this.toggleItemSelection(index);
            }
            if (e.key === 'Enter') {
                this.selectItem(index);
            }
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                (_a = items[(index + 1) % items.length].parentElement) === null || _a === void 0 ? void 0 : _a.focus();
            }
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                const l = items.length;
                (_b = items[(l + index - 1) % l].parentElement) === null || _b === void 0 ? void 0 : _b.focus();
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
                if (this.items && this.items.length) {
                    if (this.__selectedIndexes && this.__selectedIndexes.size) {
                        this.__selectedIndexes = new Set();
                    }
                }
                this.items = new ReadOnlyArray(Array.from(children));
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
    property({ attribute: false, noAccessor: true })
], BasicListElement.prototype, "selected", null);
__decorate([
    property({ attribute: false, noAccessor: true })
], BasicListElement.prototype, "selectedIndexes", null);
__decorate([
    property({ type: Array })
], BasicListElement.prototype, "items", void 0);
__decorate([
    state()
], BasicListElement.prototype, "__selectedIndexes", void 0);
//# sourceMappingURL=BasicListElement.js.map