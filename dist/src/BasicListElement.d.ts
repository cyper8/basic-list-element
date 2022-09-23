import { LitElement, CSSResult, TemplateResult } from 'lit';
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
export declare class BasicListElement extends LitElement {
    /**
     * ShadowDOM styles define custom style parameters:
     *
     * @param ```--ble-main-color```
     * @default '#555'
     *
     * @param ```--ble-secondary-color```
     * @default '#f9f9f9'
     *
     * @param ```--ble-selection-color```
     * @default '#00ccff'
     *
     * @param ```--ble-focus-color```
     * @default '#c5f3ff'
     *
     * @param ```--ble-background```
     * @default 'transparent'
     *
     * @param ```--ble-text```
     * @default '1rem serif var(--ble-main-color)'
     *
     * @param ```--ble-border```
     * @default 'solid 0px var(--ble-main-color)'
     *
     * @param ```--ble-selected-background```
     * @default 'transparent'
     *
     * @param ```--ble-selected-text```
     * @default 'bold 1rem serif var(--ble-main-color)'
     *
     * @param ```--ble-selected-border```
     * @default 'solid 0px var(--ble-selection-color)'
     *
     * @param ```--ble-focus-text```
     * @default 'var(--ble-text)'
     *
     * @param ```--ble-focus-background```
     * @default 'var(--ble-focus-color)'
     *
     * @param ```--ble-focus-border```
     * @default 'var(--ble-border)'
     *
     * @readonly
     * @static
     * @type {CSSResult[]}
     * @memberof BasicListElement
     */
    static get styles(): CSSResult[];
    label: string;
    name: string;
    multiple: boolean;
    get selected(): Element[];
    set selectedIndexes(indexes: number[]);
    get selectedIndexes(): number[];
    private get slotChildren();
    items: ReadOnlyArray<Element>;
    private __selectedIndexes;
    private selectItem;
    private deselectItem;
    private toggleItemSelection;
    updated(props: Map<keyof BasicListElement, unknown>): void;
    render(): TemplateResult;
}
