import { SlateElement } from '@yoopta/editor';

export type CalloutPluginElementKeys = 'callout';

export type CalloutTheme = 'default' | 'success' | 'warning' | 'error' | 'info';
export type CalloutElementProps = { bgColor?: string; textColor?: string; borderColor?: string };
export type CalloutElement = SlateElement<'callout', CalloutElementProps>;

export type CalloutElementMap = {
  callout: CalloutElement;
};
