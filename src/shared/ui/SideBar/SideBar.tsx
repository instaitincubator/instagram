import React, { useState } from 'react'

import Button from '@/shared/ui/Button/Button'
import CustomLink from '@/shared/ui/SideBar/CustomLink'
import Image from 'next/image'

import { Bookmark, Home, Message, Plus, Profile, Search, Trending } from '../../../../public'

const SideBar = () => {
  return (
    <nav className="flex flex-col w-full min-w-[220px]">
      <div className="flex flex-col items-start w-full pl-14 gap-[24px] ">
        <CustomLink alt="home" href={'/'} title={'Home'}>
          <Home />
        </CustomLink>
        <CustomLink alt="Create" href={'/'} title={'Create'}>
          <Plus />
        </CustomLink>
        <CustomLink alt="profile" href={'/profile'} title={'My Profile'}>
          <Profile />
        </CustomLink>
        <CustomLink alt="messenger" href={'/profile'} title={'Messenger'}>
          <Message />
        </CustomLink>
        <CustomLink alt="search" href={'/profile'} title={'Search'}>
          <Search />
        </CustomLink>
      </div>
      <div className="flex flex-col items-start w-full pl-14 pt-[60px] gap-[24px]">
        <CustomLink alt="statistics" href={'/statistics'} title={'Statistics'}>
          <Trending />
        </CustomLink>
        <CustomLink alt="favorites" href={'/favorites'} title={'Favorites'}>
          <Bookmark />
        </CustomLink>
      </div>
      <div className="flex items-start w-full pl-16 pt-[180px] text-light-100">
        <Image alt="logOut" className="cursor-pointer" height={36} src="/log-out.svg" width={36} />
        <Button as="a" variant="text">
          <span className="text-light-100 p-0 ">Log Out</span>
        </Button>
      </div>
    </nav>
  )
}

export default SideBar
