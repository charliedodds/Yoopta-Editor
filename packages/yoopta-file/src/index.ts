import { generateId, getElementByPath, createYooptaPlugin, YooEditor } from '@yoopta/editor';
import { Transforms } from 'slate';
import { FileElement, FileElementData, FilePluginOptions } from './types';
import { File as FileRender } from './ui/File';
import { FileEditorFactory } from './ui/FileEditor';

declare module 'slate' {
  interface CustomTypes {
    Editor: YooEditor;
    Element: FileElement;
  }
}

const File = createYooptaPlugin<FilePluginOptions, FileElement>({
  type: 'file',
  shortcut: 'file',
  renderer: {
    // @ts-ignore [TODO: fix types]
    editor: FileEditorFactory,
    render: FileRender,
  },
  extendEditor(editor) {
    const { isVoid } = editor;

    editor.isVoid = (element) => {
      return element.type === File.getPlugin.type ? true : isVoid(element);
    };

    return editor;
  },
  events: {
    onKeyDown:
      (editor, { defaultNode, hotkeys }) =>
      (event) => {
        const currentNode = getElementByPath(editor, editor.selection?.anchor.path, 'highest');
        if (currentNode.type !== 'file' || !editor.selection) return;

        if (hotkeys.isEnter(event)) {
          event.preventDefault();

          Transforms.insertNodes(editor, defaultNode, { mode: 'highest' });
          return;
        }
      },
  },
  defineElement: (): FileElement => ({
    id: generateId(),
    type: 'file',
    nodeType: 'void',
    data: { url: null, name: '', size: 0 },
    children: [{ text: '' }],
  }),
  createElement: (editor, elementData) => {
    const node: FileElement = { ...File.getPlugin.defineElement(), ...elementData };

    Transforms.setNodes(editor, node, {
      at: editor.selection?.anchor,
    });
  },
  exports: {
    markdown: {
      serialize: (node, children) => {
        return `![${node.data.caption || ''}](${node.data.url})\n`;
      },
    },
    html: {
      serialize: (node, children) => {
        return `<img src="${node.data.url}" width="${node.data.size?.width}" height="${node.data.size
          ?.height}" decoding="async" loading="lazy"  alt="${node.data.caption || 'yoopta-html-file'}" />`;
      },
      deserialize: {
        nodeName: 'IMG',
        parse: (el): Partial<FileElementData> => ({
          url: el.getAttribute('src'),
        }),
      },
    },
  },
  options: {
    searchString: 'file url',
    displayLabel: 'File',
  },
});

export default File;
export { FileElement, FileElementData, FilePluginOptions };
