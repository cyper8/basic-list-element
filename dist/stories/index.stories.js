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
        bgColor: { control: 'color' },
        textColor: { control: 'color' },
        borderColor: { control: 'color' },
        selectionColor: { control: 'color' },
        focusColor: { control: 'color' },
    },
    parameters: {
        actions: {
            handles: ['selection-changed'],
        },
    },
};
const Template = ({ label = 'Hello world', name = 'list', multiple = false, mainColor = '#777', secColor = '#f9f9f9', bgColor = 'transparent', textColor = mainColor, borderColor = mainColor, selectionColor = '#00ccff', focusColor = '#c5f3ff', slot, }) => html `
  <basic-list-element
    style="--ble-main-color: ${mainColor};
    --ble-secondary-color: ${secColor};
    --ble-bg-color: ${bgColor};
    --ble-text-color: ${textColor};
    --ble-border-color: ${borderColor};
    --ble-selection-color: ${selectionColor};
    --ble-focus-color: ${focusColor}"
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
    slot: opts.map(op => html `<p>${op}</p>`),
};
SlottedContent.argTypes = {
    slot: { table: { disable: true } },
};
export const CustomStyling = Template.bind({});
CustomStyling.args = {
    ...SlottedContent.args,
    mainColor: 'black',
    secColor: 'pink',
    bgColor: 'green',
    textColor: 'red',
    borderColor: 'yellow',
    selectionColor: 'white',
    focusColor: 'blue',
};
CustomStyling.argTypes = {
    slot: { table: { disable: true } },
};
//# sourceMappingURL=index.stories.js.map