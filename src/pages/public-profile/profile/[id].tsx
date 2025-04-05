import React, { useEffect, useRef, useState } from 'react'

import { getPublicLayoutWithSidebar } from '@/app/layouts/PublicLayoutWithSidebar/PublicLayoutWithSidebar'
import PostModal from '@/entities/Post/PostModal'
import { UserInfo } from '@/features/UserInfo/UserInfo'
import { useMeQuery } from '@/services/auth/signInApi'
import {
  useDeletePostMutation,
  useLazyGetPublicPostQuery,
  useUpdatePostMutation,
} from '@/services/profile/postsApi'
import { useTranslation } from '@/shared/hooks/useTranslation'
import {
  PostsPublicItems,
  ProfileInfo,
  ProfilePublicPosts,
} from '@/shared/types/ApiTypes/ProfileApiTypes'
import { CommentForPost } from '@/shared/types/public.types'
import { Modal } from '@/shared/ui/Modal/Modal'
import { cn } from '@/shared/utils/cn'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { noImage } from '../../../../public'

interface Props {
  comments: CommentForPost | null
  posts: ProfilePublicPosts
  profileInfo: ProfileInfo
  selectedPost: PostsPublicItems | null
}

export const getServerSideProps: GetServerSideProps<Props> = async context => {
  const { id, postId } = context.query
  const resProfile = await fetch(`https://inctagram.work/api/v1/public-user/profile/${id}`)
  const profileInfo: ProfileInfo = await resProfile.json()
  const postsRes = await fetch(`https://inctagram.work/api/v1/public-posts/user/${id}`)
  const posts: ProfilePublicPosts = await postsRes.json()
  let selectedPost = null
  let comments = null

  if (postId) {
    const postRes = await fetch(`https://inctagram.work/api/v1/public-posts/${postId}`)
    const commentsRes = await fetch(`https://inctagram.work/api/v1/public-posts/${postId}/comments`)

    selectedPost = await postRes.json()
    comments = await commentsRes.json()
  }

  return {
    props: {
      comments,
      posts,
      profileInfo,
      selectedPost,
    },
  }
}

const Profile = ({ comments, posts, profileInfo, selectedPost }: Props) => {
  const router = useRouter()
  const [isModalVisible, setIsModalVisible] = useState<boolean>(true)
  const me = useMeQuery()
  const [allPosts, setAllPosts] = useState<PostsPublicItems[]>(posts.items)
  const [fetchPosts, { data: newPosts, isFetching }] = useLazyGetPublicPostQuery()
  const lastPostObserverRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (newPosts?.items) {
      setAllPosts(prevPosts => [...prevPosts, ...newPosts.items])
    }
  }, [newPosts])

  useEffect(() => {
    if (!lastPostObserverRef.current || isFetching || allPosts.length >= posts.totalCount) {
      return
    }
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          const lastPostId = allPosts.length > 0 ? allPosts[allPosts.length - 1].id : 1

          fetchPosts({
            endCursorPostId: lastPostId,
            pageSize: 8,
            userId: profileInfo.id,
          })
        }
      },
      { threshold: 1.0 }
    )

    observer.observe(lastPostObserverRef.current)

    return () => observer.disconnect()
  }, [isFetching])

  const closeModal = () => {
    setIsModalVisible(false)
    const updatedQuery = { ...router.query }

    delete updatedQuery.postId
    void router.back()
  }

  const [deletePost] = useDeletePostMutation()
  const [editPost] = useUpdatePostMutation()

  const updatePost = (id: number, description: string) => {
    editPost({ description: { description }, id }).then(res => {
      fetchPosts({ endCursorPostId: 1, userId: profileInfo.id })
    })
  }
  const deletePostHandler = (id: number) => {
    deletePost(id)
    closeModal()
  }

  return (
    <div
      className={cn('mt-o w-full', {
        'mx-auto': !me?.data?.userId,
      })}
    >
      <div className="flex items-baseline flex-col gap-[13px] flex-1 pt-[24px] px-[15px] md:pr-16 mb:pb-[59px] md:pl-6 md:pt-[35px] w-full">
        <UserInfo postsForPublic={posts} profileInfo={profileInfo} />
        <div className="grid grid-cols-3 md:grid-cols-4 gap-[3px] md:gap-[12px] pt-[29px] mb:pt-[59px] mx-auto">
          {allPosts.map(el => {
            const onPostOpen = () => {
              setIsModalVisible(true)
              void router.push(`/public-profile/profile/${el.ownerId}?postId=${el.id}`)
            }

            return (
              <div className="flex justify-center" key={el.id}>
                <Image
                  alt={el.description}
                  className="md:w-[234px] w-full md:h-[224px] object-cover"
                  height={108}
                  onClick={onPostOpen}
                  src={el.images.length ? el.images[0].url : noImage}
                  width={108}
                />
              </div>
            )
          })}
        </div>
        <div className="h-10" ref={lastPostObserverRef} />
      </div>
      {isModalVisible && selectedPost && (
        <PostModal
          comments={comments!}
          deletePostCallback={deletePostHandler}
          editPost={updatePost}
          onClose={closeModal}
          post={selectedPost!}
        />
      )}

      {/*<Modal className={'z-999'}>ophtoperorkopregkopgorekpogrkpgorpoerg rrkrkrkrkr</Modal>*/}
    </div>
  )
}

Profile.getLayout = getPublicLayoutWithSidebar
export default Profile
