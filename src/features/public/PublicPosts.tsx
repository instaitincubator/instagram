import React, { useState } from 'react'

import {PostCard} from '@/entities/Post/PostCard';
import PostModal from '@/entities/Post/PostModal';
import {Post, PublicPostProps} from '@/shared/types/public.types';

const PublicPosts = ({ posts }: PublicPostProps) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  const openModal = (post: Post) => {
    setSelectedPost(post)
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setSelectedPost(null)
    setModalIsOpen(false)
  }

  return (
    <div className="flex py-[36px] justify-between mx-auto flex-wrap flex-grow">
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
