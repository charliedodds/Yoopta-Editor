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
        theme: 'default',
        bgColor: '',
        textColor: '',
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
            const theme = el.getAttribute('data-theme') as CalloutTheme;
            const bgColor = el.getAttribute('data-bg-color');
            const textColor = el.getAttribute('data-text-color');
            const borderColor = el.getAttribute('data-border-color');

            return {
              id: generateId(),
              type: 'callout',
              children: deserializeTextNodes(editor, el.childNodes),
              props: {
                theme,
                bgColor,
                textColor,
                borderColor,
              },
            };
          }
        },
      },
      serialize: (element, text, blockMeta) => {
        const theme = element.props.theme;
        const bgColor = element.props.bgColor;
        const textColor = element.props.textColor;
        const borderColor = element.props.borderColor;
        const { align = 'left', depth = 0 } = blockMeta || {};

        return `<dl ${theme ? `data-theme="${theme}"` : ''} ${bgColor ? `data-bg-color="${bgColor}"` : ''} ${
          textColor ? `data-text-color="${textColor}"` : ''
        } ${
          borderColor ? `data-border-color="${borderColor}"` : ''
        } data-meta-align="${align}" data-meta-depth="${depth}" style="margin-left: ${depth}px; text-align: ${align}; padding: .5rem .5rem .5rem 1rem; margin-top: .5rem; border-radius: .375rem; ${
          theme || textColor ? `color: ${CALLOUT_THEME_STYLES[theme].color || textColor};` : ''
        } ${theme || borderColor ? `border-left: 4px solid ${CALLOUT_THEME_STYLES[theme].color || borderColor}; ` : ''}${
          theme || bgColor ? `background-color: ${CALLOUT_THEME_STYLES[theme].backgroundColor || bgColor}"` : ''
        }>${serializeTextNodes(element.children)}</dl>`;
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
