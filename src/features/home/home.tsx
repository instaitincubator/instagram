import React, { useEffect, useRef, useState } from 'react'

import UserAvatar from '@/entities/UserAvatar/UserAvatar'
import { homePostsPaginationParams } from '@/features/home/const'
import { HomePostImage } from '@/features/home/ui/HomePostImage'
import { MobilePostMenu } from '@/features/home/ui/MobilePostMenu'
import { PostActionPanel } from '@/features/home/ui/PostActionPanel'
import { PostComments } from '@/features/home/ui/PostComments/PostComments'
import { FormatDateForPost } from '@/features/home/ui/formatDateForPost'
import { useGetFollowersPostsQuery } from '@/services/home-posts/home-page-api'
import { HomePagePost, homePageRequest } from '@/services/home-posts/home-page-types'
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
                <FormatDateForPost createdAt={post.createdAt} />
                <MobilePostMenu
                  imageUrl={`${process.env.NEXT_PUBLIC_DOMAIN}/public-profile/profile/${post.ownerId}?postId=${post.id}`}
                  postId={post.ownerId}
                />
              </div>
            </div>
            <HomePostImage images={post.images} postId={post.id} />
            <PostActionPanel id={post.id} />
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
