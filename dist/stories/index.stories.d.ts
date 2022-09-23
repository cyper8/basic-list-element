import { TemplateResult } from 'lit-html';
import '../basic-list-element.js';
declare const _default: {
    title: string;
    component: string;
    argTypes: {
        label: {
            control: string;
        };
        name: {
            control: string;
        };
        multiple: {
            control: string;
        };
        mainColor: {
            control: string;
        };
        secColor: {
            control: string;
        };
        iBackground: {
            control: string;
        };
        iFont: {
            control: string;
        };
        iBorder: {
            control: string;
        };
        selectionColor: {
            control: string;
        };
        focusColor: {
            control: string;
        };
        selBackground: {
            control: string;
        };
        selFont: {
            control: string;
        };
        selBorder: {
            control: string;
        };
        focusFont: {
            control: string;
        };
        focusBorder: {
            control: string;
        };
        focusBackground: {
            control: string;
        };
    };
    parameters: {
        actions: {
            handles: string[];
        };
    };
};
export default _default;
interface Story<T> {
    (args: T): TemplateResult;
    args?: Partial<T>;
    argTypes?: Record<string, unknown>;
}
interface ArgTypes {
    label?: string;
    name?: string;
    multiple?: boolean;
    mainColor: string;
    secColor: string;
    iBackground: string;
    iFont: string;
    iBorder: string;
    selectionColor: string;
    focusColor: string;
    selBackground: string;
    selFont: string;
    selBorder: string;
    focusFont: string;
    focusBorder: string;
    focusBackground?: string;
    slot?: TemplateResult | TemplateResult[];
}
export declare const Regular: Story<ArgTypes>;
export declare const CustomLabel: Story<ArgTypes>;
export declare const CustomName: Story<ArgTypes>;
export declare const SlottedContent: Story<ArgTypes>;
export declare const CustomStyling: Story<ArgTypes>;
