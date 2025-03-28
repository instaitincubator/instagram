import React, { useEffect, useRef, useState } from 'react'

import UserAvatar from '@/entities/UserAvatar/UserAvatar'
import { homePostsPaginationParams } from '@/features/home/const'
import { HomePostImage } from '@/features/home/ui/HomePostImage'
import { MobilePostMenu } from '@/features/home/ui/MobilePostMenu'
import { PostActionPanel } from '@/features/home/ui/PostActionPanel'
import { PostComments } from '@/features/home/ui/PostComments/PostComments'
import { useGetFollowersPostsQuery } from '@/services/home-posts/home-page-api'
import { HomePagePost, homePageRequest } from '@/services/home-posts/home-page-types'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Separator } from 'radix-ui'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export const HomePage = () => {
  const [postsPaginationParams, setPostsPaginationParams] =
    useState<homePageRequest>(homePostsPaginationParams)

  const { data: followersPosts } = useGetFollowersPostsQuery(postsPaginationParams)
  const lastPostObserverRef = useRef<HTMLDivElement | null>(null)
  const [allFollowersPosts, setAllFollowersPosts] = useState<HomePagePost[]>([])

  const { t } = useTranslation()

  const formatDateForPost = (date: string) => {
    const now = new Date()
    const postDate = new Date(date)
    const differenceInTime = now.getTime() - postDate.getTime()

    const differenceInSeconds = Math.floor(differenceInTime / 1000)
    const differenceInMinutes = Math.floor(differenceInSeconds / 60)
    const differenceInHours = Math.floor(differenceInMinutes / 60)
    const differenceInDays = Math.floor(differenceInHours / 24)
    const differenceInMonths = Math.floor(differenceInDays / 30)
    const differenceInYears = Math.floor(differenceInMonths / 12)

    if (differenceInSeconds < 60) {
      return `${differenceInSeconds} ${t.timeAdditionPost.seconds}${
        differenceInSeconds === 1 ? 'у' : 'ы'
      } ${t.timeAdditionPost.back}`
    } else if (differenceInMinutes < 60) {
      return `${differenceInMinutes} минут${differenceInMinutes === 1 ? 'у' : 'ы'} ${
        t.timeAdditionPost.back
      }`
    } else if (differenceInHours < 24) {
      return `${differenceInHours} час${differenceInHours === 1 ? 'а' : 'ов'} ${
        t.timeAdditionPost.back
      }`
    } else if (differenceInDays < 30) {
      let ending

      if (differenceInDays === 1) {
        ending = 'день'
      } else if (differenceInDays === 2 || differenceInDays === 3 || differenceInDays === 4) {
        ending = t.timeAdditionPost.days
      } else {
        ending = t.timeAdditionPost.days
      }

      return `${differenceInDays} ${ending} ${t.timeAdditionPost.back}`
    } else if (differenceInMonths < 12) {
      return `${differenceInMonths} месяц${differenceInMonths === 1 ? '' : 'а'} ${
        t.timeAdditionPost.back
      }`
    } else {
      return `${differenceInYears} год${differenceInYears === 1 ? '' : 'а'} ${
        t.timeAdditionPost.back
      }`
    }
  }

  useEffect(() => {
    if (followersPosts) {
      setAllFollowersPosts(prev => {
        return [...prev!, ...followersPosts.items!]
      })
    }
  }, [followersPosts])

  useEffect(() => {
    if (!lastPostObserverRef.current || !followersPosts) {
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setPostsPaginationParams(prev => ({
            ...prev,
            endCursorPostId: followersPosts.nextCursor!,
          }))
        }
      },
      { threshold: 1.0 }
    )

    observer.observe(lastPostObserverRef.current)

    return () => observer.disconnect()
  }, [allFollowersPosts.length, followersPosts])

  if (!followersPosts) {
    return null
  }

  return (
    <div className="p-4 flex flex-col gap-4 sm:max-w-[860px] sm:min-w-[340px] sm:w-[80%] m-auto">
      {allFollowersPosts?.map(post => {
        return (
          <div className="w-full" key={post.id}>
            <div className="flex justify-between items-center">
              <UserAvatar
                avatar={post.avatarOwner}
                userId={post.ownerId}
                userName={post.userName}
              />
              <div className="flex gap-4">
                <span className="opacity-50">{formatDateForPost(post.createdAt)}</span>
                <MobilePostMenu imageUrl={post.images[0]?.url} />
              </div>
            </div>
            <HomePostImage images={post.images} postId={post.id} />
            <PostActionPanel
              avatarWhoLikes={post.avatarWhoLikes}
              id={post.id}
              likesCount={post.likesCount}
            />
            <PostComments
              description={post.description}
              postId={post.id}
              username={post.userName}
            />
            <Separator.Root className="my-2 bg-dark-100 h-[1px]" />
          </div>
        )
      })}
      <div className="h-10" ref={lastPostObserverRef} />
    </div>
  )
}
