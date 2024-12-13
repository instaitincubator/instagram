import React, { useState } from 'react'

import {PostCard} from '@/entities/Post/PostCard';
import PostModal from '@/entities/Post/PostModal';
import {Post, PublicPostProps} from '@/shared/types/public.types';
import { useRouter } from 'next/router'

const PublicPosts = ({ posts }: PublicPostProps) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const router = useRouter()
  const openModal = (post: Post) => {

    void router.push(`/?postId=${post.id}`)
  }

  const closeModal = () => {
    setSelectedPost(null)
    setModalIsOpen(false)
  }

  return (
      <div
        // className="flex py-[36px] justify-between mx-auto flex-wrap flex-grow gap-x-[12px]"
        className="grid grid-cols-posts py-[36px] justify-between mx-auto flex-wrap flex-grow gap-[12px]"
      >
        {posts?.map(post => (
          <PostCard key={post.id} openModal={() => openModal(post)} post={post} />
        ))}
        {modalIsOpen && selectedPost && (
          <PostModal onClose={closeModal} post={selectedPost} />
        )}
      </div>

  )
}

export default PublicPosts
