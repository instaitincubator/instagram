import React, { useEffect, useRef, useState } from 'react'

import { LikesCounter } from '@/entities/likesCounter/LikesCounter'
import { homePostsPaginationParams } from '@/features/home/const'
import { HomePostImage } from '@/features/home/ui/HomePostImage'
import { useGetFollowersPostsQuery } from '@/services/home-posts/home-page-api'
import { homePageRequest } from '@/services/home-posts/home-page-types'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export const HomePage = () => {
  const [postsPaginationParams, setPostsPaginationParams] =
    useState<homePageRequest>(homePostsPaginationParams)
  const { data: followersPosts, isFetching: isPostsFetching } =
    useGetFollowersPostsQuery(postsPaginationParams)
  const lastPostObserverRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!lastPostObserverRef.current || isPostsFetching) {
      return
    }
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setPostsPaginationParams(prev => {
            return { ...prev, endCursorPostId: followersPosts?.nextCursor! }
          })
        }
      },
      { threshold: 1.0 }
    )

    observer.observe(lastPostObserverRef.current)

    return () => observer.disconnect()
  }, [isPostsFetching])

  if (!followersPosts) {
    return null
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      {followersPosts?.items.map(post => {
        return (
          <div className="border-2 border-dark-300" key={post.id}>
            <HomePostImage images={post.images} />
            <span>
              {post.owner.firstName}
              {post.owner.lastName}
            </span>
            <LikesCounter
              avatarWhoLikes={post.avatarWhoLikes}
              likesCount={post.likesCount}
              postId={post.id}
            />
          </div>
        )
      })}
      <div className="h-10" ref={lastPostObserverRef} />
    </div>
  )
}
