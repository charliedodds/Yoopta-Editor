import { Elements, UI, YooEditor, YooptaBlockData } from '@yoopta/editor';
import { CalloutElementProps, CalloutPluginElementKeys } from '../types';
import { ChangeEvent } from 'react';

const { ExtendedBlockActions, BlockOptionsMenuGroup, BlockOptionsMenuItem, BlockOptionsSeparator } = UI;

type Props = {
  editor: YooEditor;
  block: YooptaBlockData;
  props?: CalloutElementProps;
};

const CalloutBlockOptions = ({ editor, block, props: calloutProps }: Props) => {
  const currentTextColor = calloutProps?.textColor || '#000000';
  const currentBgColor = calloutProps?.bgColor || '#F5F7F9';
  const currentBorderColor = calloutProps?.borderColor || '';

  const updateTextColor = (e: ChangeEvent<HTMLInputElement>) => {
    Elements.updateElement<CalloutPluginElementKeys, CalloutElementProps>(editor, block.id, {
      type: 'callout',
      props: { textColor: e.target.value },
    });
  };
  const updateBgColor = (e: ChangeEvent<HTMLInputElement>) => {
    Elements.updateElement<CalloutPluginElementKeys, CalloutElementProps>(editor, block.id, {
      type: 'callout',
      props: { bgColor: e.target.value },
    });
  };
  const updateBorderColor = (e: ChangeEvent<HTMLInputElement>) => {
    Elements.updateElement<CalloutPluginElementKeys, CalloutElementProps>(editor, block.id, {
      type: 'callout',
      props: { borderColor: e.target.value },
    });
  };

  return (
    <ExtendedBlockActions onClick={() => editor.setSelection([block.meta.order])} className="yoopta-callout-options">
      <BlockOptionsSeparator />
      <BlockOptionsMenuGroup>
        <BlockOptionsMenuItem>
          <div className="yoopta-block-options-button">
            <div className="yoo-callout-flex">
              <input
                className="yoo-callout-w-4 yoo-callout-h-4 yoo-callout-mr-2 yoopta-callout-custom-color"
                type="color"
                name="textColor"
                id="textColor"
                onChange={updateTextColor}
                value={currentTextColor}
              />
              <label htmlFor="textColor">Update text colour</label>
            </div>
          </div>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <div className="yoopta-block-options-button">
            <div className="yoo-callout-flex">
              <input
                className="yoo-callout-w-4 yoo-callout-h-4 yoo-callout-mr-2 yoopta-callout-custom-color"
                type="color"
                name="bgColor"
                id="bgColor"
                onChange={updateBgColor}
                value={currentBgColor}
              />
              <label htmlFor="bgColor">Update background colour</label>
            </div>
          </div>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <div className="yoopta-block-options-button">
            <div className="yoo-callout-flex">
              <input
                className="yoo-callout-w-4 yoo-callout-h-4 yoo-callout-mr-2 yoopta-callout-custom-color"
                type="color"
                name="borderColor"
                id="borderColor"
                onChange={updateBorderColor}
                value={currentBorderColor}
              />
              <label htmlFor="borderColor">Update border colour</label>
            </div>
          </div>
        </BlockOptionsMenuItem>
      </BlockOptionsMenuGroup>
    </ExtendedBlockActions>
  );
};

export { CalloutBlockOptions };
