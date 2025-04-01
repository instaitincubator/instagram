import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import { cn } from '@/shared/utils/cn'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { clsx } from 'clsx'

export type Props = {
  children: ReactNode
  iconButton: ReactNode
}

const DropdownRoot = DropdownMenu.Root
const DropdownTrigger = forwardRef<
  ElementRef<typeof DropdownMenu.Trigger>,
  ComponentPropsWithoutRef<typeof DropdownMenu.Trigger>
>(({ className, ...rest }, ref) => {
  return (
    <DropdownMenu.Trigger className={cn('flex align-baseline', className)} {...rest} ref={ref} />
  )
})
const DropdownPortal = DropdownMenu.Portal
const DropdownContent = forwardRef<
  ElementRef<typeof DropdownMenu.Content>,
  ComponentPropsWithoutRef<typeof DropdownMenu.Content>
>(({ children, className, side = 'bottom', ...rest }, ref) => {
  return (
    <DropdownMenu.Content
      className={cn(
        'text-light-100 mr-4 text-regular-14 bg-dark-500 w-fit rounded-sm border border-dark-100 px-2 py-3',
        className
      )}
      ref={ref}
      side={side}
      {...rest}
    >
      <div>{children}</div>
    </DropdownMenu.Content>
  )
})
const DropdownItem = forwardRef<
  ElementRef<typeof DropdownMenu.Item>,
  ComponentPropsWithoutRef<typeof DropdownMenu.Item>
>(({ className, ...rest }, ref) => {
  return (
    <DropdownMenu.Item
      className={clsx(
        'group leading-none flex items-center h-9  relative select-none outline-none',
        className
      )}
      {...rest}
      ref={ref}
    />
  )
})
const DropdownSeparator = forwardRef<
  ElementRef<typeof DropdownMenu.Separator>,
  ComponentPropsWithoutRef<typeof DropdownMenu.Separator>
>(({ className, ...rest }, ref) => {
  return <DropdownMenu.Separator className={clsx(className)} {...rest} ref={ref} />
})

export {
  DropdownContent,
  DropdownItem,
  DropdownPortal,
  DropdownRoot,
  DropdownSeparator,
  DropdownTrigger,
}
