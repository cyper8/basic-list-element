import { css } from 'lit';
export const BLEStyle = css `
  .list {
    margin: 0;
    padding: 0;
    cursor: pointer;
  }

  .item {
    margin: 0;
    padding: 0;
    font: var(--ble-text);
    background: var(--ble-background);
    border: var(--ble-border);
  }

  .item:focus,
  .item:hover {
    outline: none;
    font: var(--ble-focus-text);
    border: var(--ble-focus-border);
    background: var(--ble-focus-background);
  }

  .item[selected] {
    font: var(--ble-selected-text);
    border: var(--ble-selected-border);
    background: var(--ble-selected-background);
  }
`;
//# sourceMappingURL=ble-style.js.map