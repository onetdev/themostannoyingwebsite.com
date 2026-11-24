'use client';

import { Drawer as DrawerPrimitive } from '@base-ui/react/drawer';
import { cn } from 'cn';
import type { ComponentProps } from 'react';

export function Drawer({ ...props }: DrawerPrimitive.Root.Props) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}

export function DrawerTrigger({ ...props }: DrawerPrimitive.Trigger.Props) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

export function DrawerClose({ ...props }: DrawerPrimitive.Close.Props) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

export function DrawerPortal({ ...props }: DrawerPrimitive.Portal.Props) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

export function DrawerVirtualKeyboardProvider({
  ...props
}: DrawerPrimitive.VirtualKeyboardProvider.Props) {
  return (
    <DrawerPrimitive.VirtualKeyboardProvider
      data-slot="drawer-virtual-keyboard-provider"
      {...props}
    />
  );
}

export interface DrawerContentProps extends DrawerPrimitive.Popup.Props {
  showHandle?: boolean;
}

/**
 * Swipeable bottom sheet built on the Base UI drawer primitive.
 *
 * The popup owns the drag gesture (`touch-none`) while `DrawerBody` restores
 * native scrolling for its content. The default 80dvh height matches the
 * short-video comments surface; consumers can override it through `className`.
 */
export function DrawerContent({
  className,
  children,
  showHandle = true,
  ...props
}: DrawerContentProps) {
  return (
    <DrawerPortal>
      <DrawerPrimitive.Backdrop
        data-slot="drawer-backdrop"
        className="fixed inset-0 z-50 bg-black opacity-[calc(var(--backdrop-opacity)*(1-var(--drawer-swipe-progress)))] transition-opacity duration-300 ease-out [--backdrop-opacity:0.5] data-ending-style:opacity-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-starting-style:opacity-0 data-swiping:duration-0"
      />
      <DrawerPrimitive.Viewport
        data-slot="drawer-viewport"
        className="fixed inset-0 z-50 flex touch-none items-end justify-center"
      >
        <DrawerPrimitive.Popup
          data-slot="drawer-content"
          className={cn(
            'bg-background text-foreground border-border relative flex h-[80dvh] max-h-[calc(100dvh-1rem)] w-full max-w-2xl touch-none flex-col overflow-hidden rounded-t-2xl border-t shadow-xl outline-none [transform:translateY(var(--drawer-swipe-movement-y))] transition-transform duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-ending-style:[transform:translateY(calc(100%+2px))] data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-starting-style:[transform:translateY(calc(100%+2px))] data-swiping:transition-none',
            className,
          )}
          {...props}
        >
          {showHandle && (
            <div
              className="flex shrink-0 justify-center pt-2 pb-1"
              aria-hidden="true"
            >
              <div className="bg-muted-foreground/30 h-1 w-10 rounded-full" />
            </div>
          )}
          {children}
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPortal>
  );
}

export function DrawerBody({
  className,
  ...props
}: DrawerPrimitive.Content.Props) {
  return (
    <DrawerPrimitive.Content
      data-slot="drawer-body"
      className={cn(
        'min-h-0 flex-1 touch-auto overflow-y-auto overscroll-contain',
        className,
      )}
      {...props}
    />
  );
}

export function DrawerHeader({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="drawer-header"
      className={cn('flex flex-col gap-1.5 p-4', className)}
      {...props}
    />
  );
}

export function DrawerFooter({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn('mt-auto flex flex-col gap-2 p-4', className)}
      {...props}
    />
  );
}

export function DrawerTitle({
  className,
  ...props
}: DrawerPrimitive.Title.Props) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn('text-foreground font-semibold', className)}
      {...props}
    />
  );
}

export function DrawerDescription({
  className,
  ...props
}: DrawerPrimitive.Description.Props) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}
