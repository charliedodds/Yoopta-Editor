import { PluginElementRenderProps, useBlockData, useYooptaEditor, useYooptaReadOnly } from '@yoopta/editor';
import { CalloutBlockOptions } from './CalloutBlockOptions';

const CalloutRender = ({ extendRender, ...props }: PluginElementRenderProps) => {
  const { element, attributes, children, blockId, HTMLAttributes = {} } = props;
  const { className = '', ...htmlAttrs } = HTMLAttributes;

  const block = useBlockData(blockId);
  const editor = useYooptaEditor();
  const isReadOnly = useYooptaReadOnly();
  const { theme, bgColor, textColor, borderColor } = element.props || {};



  console.log(props)




  if (extendRender) {
    return extendRender(props);
  }

  return (
    <div
      className={`yoopta-callout ${theme ? `yoopta-callout-theme-${theme}` : ''} ${className}`}
      {...htmlAttrs}
      {...attributes}
      style={{
        ...htmlAttrs.style,
        backgroundColor: bgColor,
        color: textColor,
        borderLeft: borderColor ? `4px solid ${borderColor}` : '',
      }}
    >
      {!isReadOnly && <CalloutBlockOptions block={block} editor={editor} props={element.props} />}
      {children}
    </div>
  );
};

CalloutRender.displayName = 'Callout';

export { CalloutRender };
