import { Elements, UI, YooEditor, YooptaBlockData } from '@yoopta/editor';
import { CalloutElementProps, CalloutPluginElementKeys, CalloutTheme } from '../types';
import SuccessIcon from '../icons/success.svg';
import WarningIcon from '../icons/warning.svg';
import ErrorIcon from '../icons/error.svg';
import DefaultIcon from '../icons/default.svg';
import InfoIcon from '../icons/info.svg';
import CheckmarkIcon from '../icons/checkmark.svg';
import { ChangeEvent } from 'react';
import { CALLOUT_THEME_STYLES } from '../utils';

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
      props: { textColor: e.target.value, theme: undefined },
    });
  };
  const updateBgColor = (e: ChangeEvent<HTMLInputElement>) => {
    Elements.updateElement<CalloutPluginElementKeys, CalloutElementProps>(editor, block.id, {
      type: 'callout',
      props: { bgColor: e.target.value, theme: undefined },
    });
  };
  const updateBorderColor = (e: ChangeEvent<HTMLInputElement>) => {
    Elements.updateElement<CalloutPluginElementKeys, CalloutElementProps>(editor, block.id, {
      type: 'callout',
      props: { borderColor: e.target.value, theme: undefined },
    });
  };

  const onChangeTheme = (theme: CalloutTheme) => {
    Elements.updateElement<CalloutPluginElementKeys, CalloutElementProps>(editor, block.id, {
      type: 'callout',
      props: {
        theme,
      },
    });
  };

  const isActiveTheme = (theme: CalloutTheme) => calloutProps?.theme === theme;

  return (
    <ExtendedBlockActions onClick={() => editor.setSelection([block.meta.order])} className="yoopta-callout-options">
      <BlockOptionsSeparator />
      <BlockOptionsMenuGroup>
      <BlockOptionsMenuItem>
          <button
            type="button"
            className="yoopta-block-options-button yoo-callout-justify-between"
            onClick={() => onChangeTheme('default')}
            style={{
              backgroundColor: isActiveTheme('default') ? CALLOUT_THEME_STYLES.default.backgroundColor : undefined,
            }}
          >
            <span className="yoo-callout-flex">
              <DefaultIcon
                width={16}
                height={16}
                color={CALLOUT_THEME_STYLES.default.color}
                className="yoo-callout-w-4 yoo-callout-h-4 yoo-callout-mr-2"
              />
              Default
            </span>
            {isActiveTheme('default') && (
              <CheckmarkIcon width={16} height={16} color="#000" className="yoo-callout-w-4 yoo-callout-h-4" />
            )}
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <button
            type="button"
            className="yoopta-block-options-button yoo-callout-justify-between"
            onClick={() => onChangeTheme('info')}
            style={{ backgroundColor: isActiveTheme('info') ? CALLOUT_THEME_STYLES.info.backgroundColor : undefined }}
          >
            <span className="yoo-callout-flex">
              <InfoIcon
                width={16}
                height={16}
                color={CALLOUT_THEME_STYLES.info.color}
                className="yoo-callout-w-4 yoo-callout-h-4 yoo-callout-mr-2"
              />
              Info
            </span>
            {isActiveTheme('info') && (
              <CheckmarkIcon width={16} height={16} color="#000" className="yoo-callout-w-4 yoo-callout-h-4" />
            )}
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <button
            type="button"
            className="yoopta-block-options-button yoo-callout-justify-between"
            onClick={() => onChangeTheme('success')}
            style={{
              backgroundColor: isActiveTheme('success') ? CALLOUT_THEME_STYLES.success.backgroundColor : undefined,
            }}
          >
            <span className="yoo-callout-flex">
              <SuccessIcon
                width={16}
                height={16}
                color={CALLOUT_THEME_STYLES.success.color}
                className="yoo-callout-w-4 yoo-callout-h-4 yoo-callout-mr-2"
              />
              Success
            </span>
            {isActiveTheme('success') && (
              <CheckmarkIcon width={16} height={16} color="#000" className="yoo-callout-w-4 yoo-callout-h-4" />
            )}
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <button
            type="button"
            className="yoopta-block-options-button yoo-callout-justify-between"
            onClick={() => onChangeTheme('warning')}
            style={{
              backgroundColor: isActiveTheme('warning') ? CALLOUT_THEME_STYLES.warning.backgroundColor : undefined,
            }}
          >
            <span className="yoo-callout-flex">
              <WarningIcon
                width={16}
                height={16}
                color={CALLOUT_THEME_STYLES.warning.color}
                className="yoo-callout-w-4 yoo-callout-h-4 yoo-callout-mr-2"
              />
              Warning
            </span>
            {isActiveTheme('warning') && (
              <CheckmarkIcon width={16} height={16} color="#000" className="yoo-callout-w-4 yoo-callout-h-4" />
            )}
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <button
            type="button"
            className="yoopta-block-options-button yoo-callout-justify-between"
            onClick={() => onChangeTheme('error')}
            style={{ backgroundColor: isActiveTheme('error') ? CALLOUT_THEME_STYLES.error.backgroundColor : undefined }}
          >
            <span className="yoo-callout-flex">
              <ErrorIcon
                width={16}
                height={16}
                color={CALLOUT_THEME_STYLES.error.color}
                className="yoo-callout-w-4 yoo-callout-h-4 yoo-callout-mr-2"
              />
              Error
            </span>
            {isActiveTheme('error') && (
              <CheckmarkIcon width={16} height={16} color="#000" className="yoo-callout-w-4 yoo-callout-h-4" />
            )}
          </button>
        </BlockOptionsMenuItem>
        <BlockOptionsSeparator />
        <BlockOptionsMenuItem>
          <div className="yoopta-block-options-button">
              <label className='yoo-callout-flex yoo-callout-cursor-pointer yoo-callout-w-full'>
                <input
                  className="yoo-callout-w-4 yoo-callout-h-4 yoo-callout-mr-2 yoopta-callout-custom-color"
                  type="color"
                  name="textColor"
                  id="textColor"
                  onChange={updateTextColor}
                  value={currentTextColor}
                />
                Update text color
              </label>
          </div>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <div className="yoopta-block-options-button">
            <label className="yoo-callout-flex yoo-callout-cursor-pointer yoo-callout-w-full">
              <input
                className="yoo-callout-w-4 yoo-callout-h-4 yoo-callout-mr-2 yoopta-callout-custom-color"
                type="color"
                name="bgColor"
                id="bgColor"
                onChange={updateBgColor}
                value={currentBgColor}
              />
              Update background color
            </label>
          </div>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <div className="yoopta-block-options-button">
            <label className="yoo-callout-flex yoo-callout-w-full">
              <input
                className="yoo-callout-w-4 yoo-callout-h-4 yoo-callout-mr-2 yoopta-callout-custom-color"
                type="color"
                name="borderColor"
                id="borderColor"
                onChange={updateBorderColor}
                value={currentBorderColor}
              />
              Update border color
            </label>
          </div>
        </BlockOptionsMenuItem>
      </BlockOptionsMenuGroup>
    </ExtendedBlockActions>
  );
};

export { CalloutBlockOptions };
