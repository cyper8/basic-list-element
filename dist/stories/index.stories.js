import { html } from 'lit-html';
import '../basic-list-element.js';
const opts = ['Option 1', 'Option 2', 'Option 3'];
export default {
    title: 'BasicListElement',
    component: 'basic-list-element',
    argTypes: {
        label: { control: 'text' },
        name: { control: 'text' },
        multiple: { control: 'boolean' },
        mainColor: { control: 'color' },
        secColor: { control: 'color' },
        iBackground: { control: 'text' },
        iFont: { control: 'text' },
        iBorder: { control: 'text' },
        selectionColor: { control: 'color' },
        focusColor: { control: 'color' },
        selBackground: { control: 'text' },
        selFont: { control: 'text' },
        selBorder: { control: 'text' },
        focusFont: { control: 'text' },
        focusBorder: { control: 'text' },
        focusBackground: { control: 'text' },
    },
    parameters: {
        actions: {
            handles: ['selection-changed'],
        },
    },
};
const Template = ({ label = 'Hello world', name = 'list', multiple = false, mainColor = '#777', secColor = 'transparent', selectionColor = '#00ccff', focusColor = '#c5f3ff', iBackground = 'var(--ble-secondary-color)', iFont = `1rem serif var(--ble-main-color)`, iBorder = `none`, selBackground = `var(--ble-selection-color)`, selFont = `bold var(--ble-text)`, selBorder = `var(--ble-border)`, focusFont = `var(--ble-text)`, focusBorder = `var(--ble-border)`, focusBackground = `var(--ble-focus-color)`, slot, }) => html `
  <basic-list-element
    style="--ble-main-color: ${mainColor};
--ble-secondary-color: ${secColor};
--ble-selection-color: ${selectionColor};
--ble-focus-color: ${focusColor};
--ble-background: ${iBackground};
--ble-text: ${iFont};
--ble-border: ${iBorder};
--ble-selected-background: ${selBackground};
--ble-selected-text: ${selFont};
--ble-selected-border: ${selBorder};
--ble-focus-text: ${focusFont};
--ble-focus-background: ${focusBackground};
--ble-focus-border: ${focusBorder};"
    .label=${label}
    .name=${name}
    ?multiple=${multiple}
  >
    ${slot}
  </basic-list-element>
`;
export const Regular = Template.bind({});
export const CustomLabel = Template.bind({});
CustomLabel.args = {
    label: 'My label',
};
export const CustomName = Template.bind({});
CustomName.args = {
    label: 'My Label',
    name: 'boo',
};
export const SlottedContent = Template.bind({});
SlottedContent.args = {
    slot: opts.map(op => html `<div>${op}</div>`),
};
SlottedContent.argTypes = {
    slot: { table: { disable: true } },
};
export const CustomStyling = Template.bind({});
CustomStyling.args = {
    ...SlottedContent.args,
    mainColor: 'black',
    secColor: 'pink',
    selectionColor: 'white',
    focusColor: 'blue',
};
CustomStyling.argTypes = {
    slot: { table: { disable: true } },
};
//# sourceMappingURL=index.stories.js.map