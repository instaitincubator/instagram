import React, { useEffect, useRef, useState } from 'react'

import UserAvatar from '@/entities/UserAvatar/UserAvatar'
import { homePostsPaginationParams } from '@/features/home/const'
import { HomePostImage } from '@/features/home/ui/HomePostImage'
import { MobilePostMenu } from '@/features/home/ui/MobilePostMenu'
import { PostActionPanel } from '@/features/home/ui/PostActionPanel'
import { useGetFollowersPostsQuery } from '@/services/home-posts/home-page-api'
import { HomePagePost, homePageRequest } from '@/services/home-posts/home-page-types'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export const HomePage = () => {
  const [postsPaginationParams, setPostsPaginationParams] =
    useState<homePageRequest>(homePostsPaginationParams)

  const { data: followersPosts, isFetching: isPostsFetching } =
    useGetFollowersPostsQuery(postsPaginationParams)
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
    <div className="p-4 flex flex-col gap-4">
      {allFollowersPosts?.map(post => {
        const lastPostId =
          allFollowersPosts.length > 0 ? allFollowersPosts[allFollowersPosts.length - 1].id : null

        return (
          <div key={post.id}>
            <div className="flex justify-between items-center">
              <UserAvatar
                avatar={post.avatarOwner}
                userId={post.ownerId}
                userName={post.userName}
              />
              <MobilePostMenu />
            </div>
            <HomePostImage images={post.images} postId={post.id} />
            <PostActionPanel
              avatarWhoLikes={post.avatarWhoLikes}
              id={post.id}
              likesCount={post.likesCount}
            />
          </div>
        )
      })}
      <div className="h-10" ref={lastPostObserverRef} />
    </div>
  )
}
