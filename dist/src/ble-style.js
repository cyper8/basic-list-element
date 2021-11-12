import { css } from 'lit';
export const BLEStyle = css `
  li.list {
    margin: 0.3em;
    padding: 0;
    width: 100%;
    cursor: pointer;
    line-height: 1.1;
    background-color: var(--ble-secondary-color);
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
`;
//# sourceMappingURL=ble-style.js.map