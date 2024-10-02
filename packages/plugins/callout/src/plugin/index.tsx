import {
  deserializeTextNodes,
  generateId,
  serializeTextNodes,
  serializeTextNodesIntoMarkdown,
  YooptaPlugin,
} from '@yoopta/editor';
import { CSSProperties } from 'react';
import { CalloutCommands } from '../commands';
import { CalloutElementMap, CalloutTheme } from '../types';
import { CalloutRender } from '../ui/Callout';
import { CALLOUT_THEME_STYLES } from '../utils';

const Callout = new YooptaPlugin<CalloutElementMap>({
  type: 'Callout',
  elements: {
    callout: {
      render: CalloutRender,
      props: {
        bgColor: '#F7F5F9',
        textColor: '#000000',
        borderColor: '',
      },
    },
  },
  commands: CalloutCommands,
  options: {
    display: {
      title: 'Callout',
      description: 'Make writing stand out',
    },
    shortcuts: ['<'],
  },
  parsers: {
    html: {
      deserialize: {
        nodeNames: ['DL'],
        parse(el, editor) {
          if (el.nodeName === 'DL' || el.nodeName === 'DIV') {
            const bgColor = el.getAttribute('data-bg-color') as string;
            const textColor = el.getAttribute('data-text-color') as string;
            const borderColor = el.getAttribute('data-border-color') as string;

            return {
              id: generateId(),
              type: 'callout',
              children: deserializeTextNodes(editor, el.childNodes),
              props: {
                bgColor,
                textColor,
                borderColor,
              },
            };
          }
        },
      },
      serialize: (element, text, blockMeta) => {
        const bgColor = element.props.bgColor || '#F7F5F9';
        const textColor = element.props.textColor || '#000000';
        const borderColor = element.props.borderColor || '';
        const { align = 'left', depth = 0 } = blockMeta || {};

        return `<dl data-bg-color="${bgColor}" data-text-color="${textColor}" data-border-color="${borderColor}" data-meta-align="${align}" data-meta-depth="${depth}" style="margin-left: ${depth}px; text-align: ${align}; padding: .5rem .5rem .5rem 1rem; margin-top: .5rem; border-radius: .375rem; color: ${textColor}; ${
          borderColor ? `border-left: 4px solid ${borderColor}; ` : ''
        }background-color: ${bgColor}">${serializeTextNodes(element.children)}</dl>`;
      },
    },
    markdown: {
      serialize: (element, text) => {
        return `> ${serializeTextNodesIntoMarkdown(element.children)}`;
      },
    },
  },
});

export { Callout };
