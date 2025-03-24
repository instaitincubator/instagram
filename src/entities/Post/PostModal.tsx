import React, { useState } from 'react'

import { Comment } from '@/entities/Post/Comment'
import { PostImage } from '@/entities/PostImage/PostImage'
import { TimePublish } from '@/entities/TimePublish/TimePublish'
import UserAvatar from '@/entities/UserAvatar/UserAvatar'
import { LikesCounter } from '@/entities/likesCounter/LikesCounter'
import CloseModal from '@/features/create-post/ul/close-modal/close-modal'
import { usePublicationForm } from '@/features/publication-form/usePublicationForm'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { PostsPublicItems } from '@/shared/types/ApiTypes/ProfileApiTypes'
import { CommentForPost } from '@/shared/types/public.types'
import { ControlledTextarea } from '@/shared/ui'
import Button from '@/shared/ui/Button/Button'
import { Modal } from '@/shared/ui/Modal/Modal'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'

interface Props {
  comments: CommentForPost
  deletePostCallback: (id: number) => void
  onClose: () => void
  post: PostsPublicItems
}

const PostModal = ({ comments, deletePostCallback, onClose, post }: Props) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()
  const title = (
    <UserAvatar
      avatar={post.avatarOwner}
      userId={post.ownerId}
      userName={post.owner ? post.owner : post.userName}
    />
  )
  const { control, errors, handleSubmit } = usePublicationForm({ description: post.description })

  return (
    <Modal
      contentClassName="p-0 pt-8 lg:pt-0 items-start justify-between"
      headerClassName="h-[60px]"
      modalClassName="lg:w-[50%] lg:min-w-[950px] w-[90%] min-w-[320px] h-auto"
      onClose={onClose}
      // title={title}
    >
      <div className="lg:flex w-full" key={post.id}>
        <div className="flex items-center justify-between">
          <Button className={'text-h3'} variant={'text'}>
            Cancel
          </Button>
          <h2 className={'text-h2'}>Edit Post</h2>
          <Button className={'text-h3 text-accent-500 '} variant={'text'}>
            Save
          </Button>
        </div>
        <div className="flex justify-between items-center relative md:hidden">
          {title}

          <AnimatePresence initial>
            <motion.button onClick={() => setIsVisible(!isVisible)}>
              <Button variant={'text'}>
                <Image alt={'more'} height={24} src={'/more.svg'} width={24} />
              </Button>
            </motion.button>
            {isVisible ? (
              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                className="absolute bg-dark-100 m-2 border items-start top-[40px] gap-[12px] flex flex-col py-[12px]  z-40 right-[14px]"
                exit={{ opacity: 0, scale: 0 }}
                initial={{ opacity: 0, scale: 0 }}
                key="box"
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
                tabIndex={0}
              >
                <Button
                  className={'flex gap-[12px]'}
                  onClick={() => deletePostCallback(post.id)}
                  variant={'text'}
                >
                  <Image alt={'more'} height={24} src={'/pen.svg'} width={24} /> Edit Post
                </Button>

                <Button
                  className={'flex gap-[12px]'}
                  onClick={() => setIsOpen(true)}
                  variant={'text'}
                >
                  <Image alt={'more'} height={24} src={'/basket.svg'} width={24} />
                  Delete Post
                </Button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
        <div className="max-w-[490px] flex-shrink-0 m-auto">
          <PostImage arrImages={post.images} height={560} width={490} />
        </div>
        <div className="flex flex-1 flex-col justify-between max-h-[474px]">
          <form action="">
            <ControlledTextarea
              className="min-h-[120px] md:h-100%"
              control={control}
              error={errors.description?.message}
              fullWidth
              label="Add publication descriptions"
              name="description"
              placeholder="Text-area"
            />
          </form>
          <div className="hidden justify-between items-center relative md:flex">
            {title}

            <AnimatePresence initial>
              <motion.button onClick={() => setIsVisible(!isVisible)}>
                <Button variant={'text'}>
                  <Image alt={'more'} height={24} src={'/more.svg'} width={24} />
                </Button>
              </motion.button>
              {isVisible ? (
                <motion.div
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute bg-dark-100 m-2 border items-start top-[40px] gap-[12px] flex flex-col py-[12px]  z-40 right-[14px]"
                  exit={{ opacity: 0, scale: 0 }}
                  initial={{ opacity: 0, scale: 0 }}
                  key="box"
                  onMouseEnter={() => setIsVisible(true)}
                  onMouseLeave={() => setIsVisible(false)}
                  tabIndex={0}
                >
                  <Button
                    className={'flex gap-[12px]'}
                    onClick={() => deletePostCallback(post.id)}
                    variant={'text'}
                  >
                    <Image alt={'more'} height={24} src={'/pen.svg'} width={24} /> Edit Post
                  </Button>

                  <Button
                    className={'flex gap-[12px]'}
                    onClick={() => setIsOpen(true)}
                    variant={'text'}
                  >
                    <Image alt={'more'} height={24} src={'/basket.svg'} width={24} />
                    Delete Post
                  </Button>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
          <div className="h-fit">
            <div className="w-full h-[1px] bg-dark-100" />
            <div className="p-2 flex flex-col gap-2">
              <LikesCounter avatarWhoLikes={post.avatarWhoLikes} likesCount={post.likesCount} />
              <article className="flex flex-wrap  gap-1">
                <h2 className={'text-bold-14  font-bold   whitespace-nowrap text-base'}>
                  {post.userName}
                </h2>
                <h1
                  className={
                    'break-words whitespace-normal overflow-hidden leading-relaxed max-w-full text-sm'
                  }
                >
                  {post.description}
                </h1>
              </article>
              <LikesCounter
                avatarWhoLikes={post.avatarWhoLikes}
                likesCount={post.likesCount}
                postId={post.id}
              />
              <TimePublish createdAt={post.createdAt} />
            </div>
          </div>
          <div className="flex flex-col gap-6 pl-6 py-6 overflow-y-auto">
            {comments?.items.length > 0 ? (
              comments?.items.map(comment => <Comment comment={comment} key={comment.id} />)
            ) : (
              <span>no comments</span>
            )}
          </div>

          {/*<div className="h-fit">*/}
          {/*  <div className="w-full h-[1px] bg-dark-100" />*/}
          {/*  <div className="p-2 flex flex-col gap-2">*/}
          {/*    <LikesCounter avatarWhoLikes={post.avatarWhoLikes} likesCount={post.likesCount} />*/}
          {/*    <TimePublish createdAt={post.createdAt} />*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
      </div>
      {isOpen && (
        <CloseModal
          onClose={() => setIsOpen(false)}
          onDiscard={() => deletePostCallback(post.id)}
          onDiscardText={'Yes'}
          onSave={() => setIsOpen(false)}
          onSaveString={'No'}
          text={'Are you sure you want to delete this post?'}
          title={t.createPost.close}
        />
      )}
    </Modal>
  )
}

export default PostModal
