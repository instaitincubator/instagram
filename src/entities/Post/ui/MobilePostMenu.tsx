import React, { ReactNode } from 'react'

import { Menu } from '@/shared/ui/icons/menu'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

interface Props {
  children: ReactNode
}

export const MobilePostMenu = ({ children }: Props) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="flex align-baseline">
        <Menu />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="text-light-100 mr-4 text-regular-14 bg-dark-500 w-fit rounded-sm border border-dark-100 px-2 py-3">
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
