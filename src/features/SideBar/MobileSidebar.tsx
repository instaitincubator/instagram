import React, { useEffect, useState } from 'react'

import { useMeQuery } from '@/services/auth/signInApi'
import { useTranslation } from '@/shared/hooks/useTranslation'
import CustomLink from '@/shared/ui/CustomLink'
import { useRouter } from 'next/router'

import {
  Home,
  HomeFill,
  Message,
  MessageFill,
  Plus,
  PlusFill,
  Profile,
  ProfileFill,
  Search,
  SearchFill,
} from '../../../public'

export const MobileSideBar = () => {
  const router = useRouter()
  const [activeLink, setActiveLink] = useState('/')
  const { t } = useTranslation()
  const { data: me } = useMeQuery()
  const [AddPostModal, setAddPostModal] = useState(false)

  useEffect(() => {
    setActiveLink(router.pathname)
  }, [router.pathname])

  return (
    <nav className="absolute bottom-0 w-full min-w-[360px] min-h-[60px] border-t border-dark-300 bg-dark-700 ">
      <div className="flex justify-evenly h-[60px] items-center w-full gap-[24px]">
        <CustomLink
          activeLink={activeLink}
          alt={t.sidebar.home}
          child1={<Home />}
          child2={<HomeFill />}
          href="/home"
          setActiveLink={setActiveLink}
          title={t.sidebar.home}
        />
        <CustomLink
          activeLink={activeLink}
          addPostModal={() => setAddPostModal(true)}
          alt={t.sidebar.create}
          child1={<Plus />}
          child2={<PlusFill />}
          setActiveLink={setActiveLink}
          title={t.sidebar.create}
        />
        <CustomLink
          activeLink={activeLink}
          alt={t.sidebar.message}
          child1={<Message />}
          child2={<MessageFill />}
          href="/message"
          setActiveLink={setActiveLink}
          title={t.sidebar.message}
        />
        <CustomLink
          activeLink={activeLink}
          alt={t.sidebar.search}
          child1={<Search />}
          child2={<SearchFill />}
          href="/search"
          setActiveLink={setActiveLink}
          title={t.sidebar.search}
        />
        <CustomLink
          activeLink={activeLink}
          alt={t.sidebar.myProfile}
          child1={<Profile />}
          child2={<ProfileFill />}
          href={`/profile/${me?.userId}`}
          setActiveLink={setActiveLink}
          title={t.sidebar.myProfile}
        />
      </div>
    </nav>
  )
}
