import React, { PropsWithChildren } from 'react'

import { Menu } from '@/shared/ui/icons/menu'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

export const MobilePostMenu: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="flex align-baseline">
        <Menu />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="text-light-100 mr-4 text-regular-14 bg-dark-500 w-fit rounded-sm border border-dark-100 px-2 py-3">
          {/*<DropdownMenu.Item className="group leading-none flex items-center h-9  relative select-none outline-none"></DropdownMenu.Item>*/}
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
