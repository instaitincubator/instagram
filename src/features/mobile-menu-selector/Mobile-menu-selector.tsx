import React, { useState } from 'react'

import { useLogOutMutation } from '@/services/auth/logOutApi'
import { useTranslation } from '@/shared/hooks/useTranslation'
import Button from '@/shared/ui/Button/Button'
import CustomLink from '@/shared/ui/CustomLink'
import { Menu } from '@/shared/ui/icons/menu'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useRouter } from 'next/router'

import { Bookmark, LogOut, SettingsOutline, Trending } from '../../../public'

export const MobileMenuSelector = () => {
  const [activeLink, setActiveLink] = useState('/')
  const [logOut, { isSuccess }] = useLogOutMutation()
  const { t } = useTranslation()
  const router = useRouter()

  const logOutHandler = () => {
    logOut()
    void router.replace('/')
  }

  if (isSuccess) {
    localStorage.removeItem('accessToken')
  }

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
              alt={t.pages.profile.profileSettings}
              child1={<SettingsOutline />}
              href={'/profileSettings'}
              setActiveLink={setActiveLink}
            >
              <span>{t.pages.profile.profileSettings}</span>
            </CustomLink>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="group leading-none flex items-center h-9  relative select-none outline-none">
            <CustomLink
              activeLink={activeLink}
              alt={t.sidebar.favourites}
              child1={<Bookmark />}
              href={'/favorites'}
              setActiveLink={setActiveLink}
            >
              <span>{t.sidebar.favourites}</span>
            </CustomLink>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="group leading-none flex items-center h-9  relative select-none outline-none">
            <CustomLink
              activeLink={activeLink}
              alt={t.sidebar.statistics}
              child1={<Trending />}
              href={'/statistics'}
              setActiveLink={setActiveLink}
            >
              <span>{t.sidebar.statistics}</span>
            </CustomLink>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="group border-2 border-transparent hover:text-accent-100 active:text-accent-700 leading-none flex items-center h-9  relative select-none outline-none">
            <LogOut />
            <Button as="a" className="pl-0" onClick={logOutHandler} variant="text">
              <span className="text-light-100 text-regular-14 hover:text-accent-100 active:text-accent-700">
                {t.sidebar.logOut}
              </span>
            </Button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
