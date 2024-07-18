import React, { useState } from 'react'

import { useAppSelector } from '@/app/store'
import CustomLink from '@/features/SideBar/CustomLink'
import { useLogOutMutation } from '@/services/auth/signInApi'
import Button from '@/shared/ui/Button/Button'
import { Menu } from '@/shared/ui/icons/menu'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { Bookmark, LogOut, SettingsOutline, Trending } from '../../../public'

export const MobileMenuSelector = () => {
  const [activeLink, setActiveLink] = useState('/')
  const [logOut] = useLogOutMutation()
  const accessToken = useAppSelector(state => state.auth.accessToken)

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="flex align-baseline">
        <Menu />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="text-light-100 mr-4 text-regular-14 bg-dark-500 w-fit rounded-sm border border-dark-100 px-2 py-3">
          <DropdownMenu.Item className="group leading-none flex items-center h-9  relative select-none outline-none">
            <CustomLink
              activeLink={activeLink}
              alt="settings"
              child1={<SettingsOutline />}
              href={'/profileSettings'}
              setActiveLink={setActiveLink}
            >
              <span>Profile Settings</span>
            </CustomLink>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="group leading-none flex items-center h-9  relative select-none outline-none">
            <CustomLink
              activeLink={activeLink}
              alt="favorites"
              child1={<Bookmark />}
              href={'/favorites'}
              setActiveLink={setActiveLink}
            >
              <span>Favorites</span>
            </CustomLink>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="group leading-none flex items-center h-9  relative select-none outline-none">
            <CustomLink
              activeLink={activeLink}
              alt="statistics"
              child1={<Trending />}
              href={'/statistics'}
              setActiveLink={setActiveLink}
            >
              <span>Statistics</span>
            </CustomLink>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="group border-2 border-transparent hover:text-accent-100 active:text-accent-700 leading-none flex items-center h-9  relative select-none outline-none">
            <LogOut />
            <Button as="a" className="pl-1" onClick={() => logOut(accessToken)} variant="text">
              <span className="text-light-100 text-regular-14 hover:text-accent-100 active:text-accent-700">
                Log Out
              </span>
            </Button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
