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
    bgColor: {
      control: string;
    };
    textColor: {
      control: string;
    };
    borderColor: {
      control: string;
    };
    selectionColor: {
      control: string;
    };
    focusColor: {
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
  mainColor?: string;
  secColor?: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  selectionColor?: string;
  focusColor?: string;
  slot?: TemplateResult | TemplateResult[];
}
export declare const Regular: Story<ArgTypes>;
export declare const CustomLabel: Story<ArgTypes>;
export declare const CustomName: Story<ArgTypes>;
export declare const SlottedContent: Story<ArgTypes>;
export declare const CustomStyling: Story<ArgTypes>;
