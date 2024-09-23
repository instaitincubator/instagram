import React, { useEffect, useState } from 'react'

import { useLogOutMutation } from '@/services/auth/logOutApi'
import { useMeQuery } from '@/services/auth/signInApi'
import { useTranslation } from '@/shared/hooks/useTranslation'
import Button from '@/shared/ui/Button/Button'
import CustomLink from '@/shared/ui/CustomLink'
import { useRouter } from 'next/router'

import {
  Bookmark,
  Home,
  HomeFill,
  LogOut,
  Message,
  MessageFill,
  Plus,
  PlusFill,
  Profile,
  ProfileFill,
  Search,
  SearchFill,
  Trending,
} from '../../../public'

export const SideBar = () => {
  const router = useRouter()
  const [activeLink, setActiveLink] = useState('/')
  const [logOut, { isSuccess }] = useLogOutMutation()
  const { t } = useTranslation()
  const { data: me } = useMeQuery()

  useEffect(() => {
    setActiveLink(router.pathname)
  }, [router.pathname])

  const logOutHandler = () => {
    logOut()
    void router.replace('/')
  }

  if (isSuccess) {
    void router.push('/sign-in')
  }

  return (
    <nav className="relative w-fit min-w-[200px] py-[73px] bg-dark-700">
      <div className="flex flex-col justify-evenly h-fit pl-14 gap-[24px]">
        <CustomLink
          activeLink={activeLink}
          alt={t.sidebar.home}
          child1={<Home />}
          child2={<HomeFill />}
          className="order-1"
          href="/home"
          setActiveLink={setActiveLink}
          title={t.sidebar.home}
        ></CustomLink>
        <CustomLink
          activeLink={activeLink}
          alt={t.sidebar.myProfile}
          child1={<Profile />}
          child2={<ProfileFill />}
          className="order-5 sm:order-3"
          href={`/profile/${me?.userId}`}
          setActiveLink={setActiveLink}
          title={t.sidebar.myProfile}
        ></CustomLink>
        <CustomLink
          activeLink={activeLink}
          alt={t.sidebar.create}
          child1={<Plus />}
          child2={<PlusFill />}
          className="order-2"
          setActiveLink={setActiveLink}
          title={t.sidebar.create}
        ></CustomLink>
        <CustomLink
          activeLink={activeLink}
          alt={t.sidebar.message}
          child1={<Message />}
          child2={<MessageFill />}
          className="order-3 sm:order-4"
          href="/message"
          setActiveLink={setActiveLink}
          title={t.sidebar.message}
        ></CustomLink>
        <CustomLink
          activeLink={activeLink}
          alt={t.sidebar.search}
          child1={<Search />}
          child2={<SearchFill />}
          className="order-4 sm:order-5"
          href="/search"
          setActiveLink={setActiveLink}
          title={t.sidebar.search}
        ></CustomLink>
      </div>
      <div className="hidden sm:flex flex-col items-start w-full pl-14 pt-[60px] gap-[24px]">
        <CustomLink
          activeLink={activeLink}
          alt={t.sidebar.statistics}
          child1={<Trending />}
          href={'/statistics'}
          setActiveLink={setActiveLink}
          title={t.sidebar.statistics}
        ></CustomLink>
        <CustomLink
          activeLink={activeLink}
          alt={t.sidebar.favourites}
          child1={<Bookmark />}
          href={'/favorites'}
          setActiveLink={setActiveLink}
          title={t.sidebar.favourites}
        ></CustomLink>
      </div>
      <div className="hidden sm:flex items-center w-full pl-16 pt-[180px] text-light-100">
        <LogOut />
        <Button as="a" className="pl-0" onClick={logOutHandler} variant="text">
          <span className="text-light-100 text-medium-14">{t.sidebar.logOut}</span>
        </Button>
      </div>
    </nav>
  )
}
