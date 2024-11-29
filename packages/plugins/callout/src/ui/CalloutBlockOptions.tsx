import { Elements, UI, YooEditor, YooptaBlockData } from '@yoopta/editor';
import SuccessIcon from '../icons/success.svg';
import WarningIcon from '../icons/warning.svg';
import ErrorIcon from '../icons/error.svg';
import DefaultIcon from '../icons/default.svg';
import InfoIcon from '../icons/info.svg';
import CheckmarkIcon from '../icons/checkmark.svg';
import { CalloutElementProps, CalloutPluginElementKeys, CalloutTheme } from '../types';
import { CALLOUT_THEME_STYLES } from '../utils';
import { HexColorInput, HexColorPicker } from 'react-colorful';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';

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

  const updateTextColor = (color: string) => {
    Elements.updateElement<CalloutPluginElementKeys, CalloutElementProps>(editor, block.id, {
      type: 'callout',
      props: { textColor: color, theme: undefined },
    });
  };
  const updateBgColor = (color: string) => {
    Elements.updateElement<CalloutPluginElementKeys, CalloutElementProps>(editor, block.id, {
      type: 'callout',
      props: { bgColor: color, theme: undefined },
    });
  };
  const updateBorderColor = (color: string) => {
    Elements.updateElement<CalloutPluginElementKeys, CalloutElementProps>(editor, block.id, {
      type: 'callout',
      props: { borderColor: color, theme: undefined },
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
          <Popover>
            <PopoverTrigger className="yoopta-block-options-button">
              <div className="yoo-callout-w-full yoo-callout-flex yoo-callout-gap-2">
                <div
                  className="yoo-callout-w-4 yoo-callout-h-4 yoo-callout-rounded-full"
                  style={{ backgroundColor: currentTextColor }}
                />
                Update text color
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <div className="yoo-callout-p-2 yoo-callout-flex yoo-callout-flex-col yoo-callout-gap-2">
                <HexColorPicker color={currentTextColor} onChange={updateTextColor} />
                <div className="yoo-callout-flex">
                  #
                  <HexColorInput
                    className="yoo-calloutw-full focus:yoo-callout-outline-none"
                    color={currentTextColor}
                    onChange={updateTextColor}
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <Popover>
            <PopoverTrigger className="yoopta-block-options-button">
              <div className="yoo-callout-w-full yoo-callout-flex yoo-callout-gap-2">
                <div
                  className="yoo-callout-w-4 yoo-callout-h-4 yoo-callout-rounded-full"
                  style={{ backgroundColor: currentBgColor }}
                />
                Update background color
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <div className="yoo-callout-p-2 yoo-callout-flex yoo-callout-flex-col yoo-callout-gap-2">
                <HexColorPicker color={currentBgColor} onChange={updateBgColor} />
                <div className="yoo-callout-flex">
                  #
                  <HexColorInput
                    className="yoo-calloutw-full focus:yoo-callout-outline-none"
                    color={currentBgColor}
                    onChange={updateBgColor}
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </BlockOptionsMenuItem>
        <BlockOptionsMenuItem>
          <Popover>
            <PopoverTrigger className="yoopta-block-options-button">
              <div className="yoo-callout-w-full yoo-callout-flex yoo-callout-gap-2">
                <div
                  className="yoo-callout-w-4 yoo-callout-h-4 yoo-callout-rounded-full"
                  style={{ backgroundColor: currentBorderColor }}
                />
                Update border color
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <div className="yoo-callout-p-2 yoo-callout-flex yoo-callout-flex-col yoo-callout-gap-2">
                <HexColorPicker color={currentBorderColor} onChange={updateBorderColor} />
                <div className="yoo-callout-flex">
                  #
                  <HexColorInput
                    className="yoo-calloutw-full focus:yoo-callout-outline-none"
                    color={currentBorderColor}
                    onChange={updateBorderColor}
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </BlockOptionsMenuItem>
      </BlockOptionsMenuGroup>
    </ExtendedBlockActions>
  );
};

export { CalloutBlockOptions };
