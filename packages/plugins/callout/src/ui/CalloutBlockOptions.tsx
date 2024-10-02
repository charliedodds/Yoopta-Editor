import { Elements, UI, YooEditor, YooptaBlockData } from '@yoopta/editor';
import { CalloutElementProps, CalloutPluginElementKeys } from '../types';
import { ChangeEvent } from 'react';

const { ExtendedBlockActions, BlockOptionsMenuGroup, BlockOptionsMenuItem, BlockOptionsSeparator } = UI;

type Props = {
  editor: YooEditor;
  block: YooptaBlockData;
  props?: CalloutElementProps;
};

const CalloutBlockOptions = ({ editor, block, props }: Props) => {
  const currentTextColor = props?.textColor || '#000';
  const currentBgColor = props?.bgColor || '#F5F7F9';
  const currentBorderColor = props?.borderColor || '';

  const updateTextColor = (e: ChangeEvent<HTMLInputElement>) => {
    Elements.updateElement<CalloutPluginElementKeys, CalloutElementProps>(editor, block.id, {
      type: 'callout',
      props: { textColor: e.target.value, borderColor: currentBorderColor, bgColor: currentBgColor },
    });
  };
  const updateBgColor = (e: ChangeEvent<HTMLInputElement>) => {
    Elements.updateElement<CalloutPluginElementKeys, CalloutElementProps>(editor, block.id, {
      type: 'callout',
      props: { bgColor: e.target.value, borderColor: currentBorderColor, textColor: currentTextColor },
    });
  };
  const updateBorderColor = (e: ChangeEvent<HTMLInputElement>) => {
    Elements.updateElement<CalloutPluginElementKeys, CalloutElementProps>(editor, block.id, {
      type: 'callout',
      props: { borderColor: e.target.value, textColor: currentTextColor, bgColor: currentBgColor },
    });
  };

  return (
    <ExtendedBlockActions onClick={() => editor.setSelection([block.meta.order])} className="yoopta-callout-options">
      <BlockOptionsSeparator />
      <BlockOptionsMenuGroup>
        <BlockOptionsMenuItem>
          <div className="yoopta-block-options-button w-full justify-between items-center gap-4">
            <label htmlFor="textColor">Update text colour</label>
            <input
              className="ml-auto"
              type="color"
              name="textColor"
              id="textColor"
              onChange={updateTextColor}
              value={currentTextColor}
            />
          </div>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <div className="yoopta-block-options-button w-full justify-between items-center gap-4">
            <label htmlFor="bgColor">Update background colour</label>
            <input
              className="ml-auto"
              type="color"
              name="bgColor"
              id="bgColor"
              onChange={updateBgColor}
              value={currentBgColor}
            />
          </div>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <div className="yoopta-block-options-button w-full justify-between items-center gap-4">
            <label htmlFor="borderColor">Update border colour</label>
            <input
              className="ml-auto"
              type="color"
              name="borderColor"
              id="borderColor"
              onChange={updateBorderColor}
              value={currentBorderColor}
            />
          </div>
        </BlockOptionsMenuItem>
      </BlockOptionsMenuGroup>
    </ExtendedBlockActions>
  );
};

export { CalloutBlockOptions };
