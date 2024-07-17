import { Menu } from '@/shared/ui/icons/menu'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

export const MobileMenuSelector = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="flex align-baseline">
        <Menu />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="text-light-100 text-regular-14 bg-dark-500 w-fit rounded-md border border-dark-100 px-3 py-4">
          <DropdownMenu.Item className="group leading-none flex items-center h-9  relative select-none outline-none">
            Profile Settings
          </DropdownMenu.Item>
          <DropdownMenu.Item className="group leading-none flex items-center h-9  relative select-none outline-none">
            Statistics
          </DropdownMenu.Item>
          <DropdownMenu.Item className="group leading-none flex items-center h-9  relative select-none outline-none">
            Favorites
          </DropdownMenu.Item>
          <DropdownMenu.Item className="group leading-none flex items-center h-9  relative select-none outline-none">
            Log Out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
