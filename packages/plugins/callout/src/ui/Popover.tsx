import * as PopoverPrimitive from '@radix-ui/react-popover';
import { useYooptaEditor } from '@yoopta/editor';

const PopoverClose = PopoverPrimitive.Close

const PopoverTrigger = ({ className, children }) => {
  return (
    <PopoverPrimitive.Trigger
      className={`yoopta-callout-popover yoo-callout-w-full yoo-callout-flex yoo-callout-items-center yoo-callout-justify-between yoo-callout-whitespace-nowrap focus:yoo-callout-outline-none disabled:yoo-callout-cursor-not-allowed disabled:yoo-callout-opacity-50 ${className}`}
    >
      {children}
    </PopoverPrimitive.Trigger>
  );
};

const PopoverContent = ({ children }) => {
  const editor = useYooptaEditor();

  return (
    <PopoverPrimitive.Portal container={editor.refElement}>
      <PopoverPrimitive.Content
        className="yoo-callout-relative yoo-callout-z-[120] yoo-callout-rounded-md yoo-callout-border-solid yoo-callout-border-[#e3e3e3] yoo-callout-bg-[#ffffff] yoo-callout-text-popover-foreground yoo-callout-shadow-md data-[state=open]:yoo-callout-animate-in data-[state=closed]:yoo-callout-animate-out data-[state=closed]:yoo-callout-fade-out-0 data-[state=open]:yoo-callout-fade-in-0 data-[state=closed]:yoo-callout-zoom-out-95 data-[state=open]:yoo-callout-zoom-in-95 data-[side=bottom]:yoo-callout-slide-in-from-top-2 data-[side=left]:yoo-callout-slide-in-from-right-2 data-[side=right]:yoo-callout-slide-in-from-left-2 data-[side=top]:yoo-callout-slide-in-from-bottom-2 data-[side=bottom]:yoo-callout-translate-y-1 data-[side=left]:-yoo-callout-translate-x-1 data-[side=right]:yoo-callout-translate-x-1 data-[side=top]:-yoo-callout-translate-y-1"
        side="left"
        align="center"
        alignOffset={5}
        sideOffset={5}
        id="yoo-popover-content"
      >
        {children}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
};

const Popover = ({ children }) => {
  return <PopoverPrimitive.Root>{children}</PopoverPrimitive.Root>;
};

export { Popover, PopoverTrigger, PopoverContent, PopoverClose };
