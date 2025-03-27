import React, { useState } from 'react'

import { Comment } from '@/entities/Post/Comment'
import { PostImage } from '@/entities/PostImage/PostImage'
import { TimePublish } from '@/entities/TimePublish/TimePublish'
import UserAvatar from '@/entities/UserAvatar/UserAvatar'
import CloseModal from '@/features/create-post/ul/close-modal/close-modal'
import { DropdownItem } from '@/features/dropdown/dropdown'
import { MobilePostMenu } from '@/features/home/ui/MobilePostMenu'
import { PostActionPanel } from '@/features/home/ui/PostActionPanel'
import { usePublicationForm } from '@/features/publication-form/usePublicationForm'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { PostsPublicItems } from '@/shared/types/ApiTypes/ProfileApiTypes'
import { CommentForPost } from '@/shared/types/public.types'
import { ControlledTextarea } from '@/shared/ui'
import Button from '@/shared/ui/Button/Button'
import { Modal } from '@/shared/ui/Modal/Modal'
import Image from 'next/image'

interface Props {
  comments: CommentForPost
  deletePostCallback: (id: number) => void
  editPost: (id: number, description: string) => void
  onClose: () => void
  post: PostsPublicItems
}

const PostModal = ({ comments, deletePostCallback, editPost, onClose, post }: Props) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenForEdit, setIsOpenForEdit] = useState(false)
  const [status, setStatus] = useState<'EDIT' | 'INITIAL'>('INITIAL')
  const { t } = useTranslation()
  const title = (
    <UserAvatar
      avatar={post.avatarOwner}
      userId={post.ownerId}
      userName={post.owner ? post.owner : post.userName}
    />
  )
  const { control, errors, handleSubmit } = usePublicationForm({ description: post.description })
  const onSubmit = (data: any) => {
    if (data.description === post.description) {
      setStatus('INITIAL')
    } else {
      editPost(post.id, data.description)
      setStatus('INITIAL')
    }
  }
  const onCloseEditor = (data: { description?: string }) => {
    if (data.description === post.description) {
      setStatus('INITIAL')
    } else {
      setIsOpenForEdit(true)
    }
  }

  return (
    <Modal
      className={'w-full '}
      contentClassName="p-[15px] pt-0  bg-dark-700 lg:bg-dark-300 lg:pt-0 items-start justify-between "
      headerClassName="h-[60px]"
      modalClassName=" lg:w-[50%] lg:min-w-[950px] w-[100%] min-w-[320px] h-auto"
      onClose={onClose}
      // title={title}
    >
      <div className="lg:flex w-full" key={post.id}>
        {status === 'EDIT' ? (
          <div className="flex items-center lg:hidden lg:invisible justify-between py-[18px] ">
            <Button className={'text-h3'} onClick={handleSubmit(onCloseEditor)} variant={'text'}>
              Cancel
            </Button>
            <h2 className={'text-h2'}>Edit Post</h2>
            <Button
              className={'text-h3 text-accent-500 '}
              onClick={handleSubmit(onSubmit)}
              variant={'text'}
            >
              Save
            </Button>
          </div>
        ) : (
          <div className="flex justify-between items-center relative md:hidden">
            {title}
            <MobilePostMenu>
              <DropdownItem>
                <Button
                  className={'flex gap-[12px]'}
                  onClick={() => setStatus('EDIT')}
                  variant={'text'}
                >
                  <Image alt={'more'} height={24} src={'/pen.svg'} width={24} /> Edit Post
                </Button>
              </DropdownItem>
              <DropdownItem>
                <Button
                  className={'flex gap-[12px]'}
                  onClick={() => setIsOpen(true)}
                  variant={'text'}
                >
                  <Image alt={'more'} height={24} src={'/basket.svg'} width={24} />
                  Delete Post
                </Button>
              </DropdownItem>
            </MobilePostMenu>
          </div>
        )}

        <div className="max-w-[490px]  lg:w-1/2 flex-shrink-0 m-auto">
          <PostImage arrImages={post.images} height={560} width={490} />
        </div>
        {status === 'EDIT' ? (
          <div className={'h-fit lg:w-1/2 flex flex-col gap-[24px] pt-[20px] lg:p-[24px]'}>
            <div className="">
              {title}
              <ControlledTextarea
                className="min-h-[120px] md:h-100%"
                control={control}
                error={errors.description?.message}
                fullWidth
                label="Add publication descriptions"
                name="description"
                placeholder="Text-area"
              />
            </div>
            <div className="mt-auto">
              <Button>Save Changes</Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 flex-col justify-between max-h-[474px]">
            <div className="hidden justify-between items-center relative md:flex">
              {title}

              <MobilePostMenu>
                <DropdownItem>
                  <Button
                    className={'flex gap-[12px]'}
                    onClick={() => setStatus('EDIT')}
                    variant={'text'}
                  >
                    <Image alt={'more'} height={24} src={'/pen.svg'} width={24} /> Edit Post
                  </Button>
                </DropdownItem>
                <DropdownItem>
                  <Button
                    className={'flex gap-[12px]'}
                    onClick={() => setIsOpen(true)}
                    variant={'text'}
                  >
                    <Image alt={'more'} height={24} src={'/basket.svg'} width={24} />
                    Delete Post
                  </Button>
                </DropdownItem>
              </MobilePostMenu>
            </div>
            <div className="h-fit">
              <div className="w-full h-[1px] bg-dark-100" />
              <div className="flex justify-around flex-col lg:flex-col-reverse">
                <div className="p-2 flex flex-col gap-2">
                  {/*<LikesCounter*/}
                  {/*  // avatarWhoLikes={post.avatarWhoLikes}*/}
                  {/*  likesCount={post.likesCount}*/}
                  {/*/>*/}
                  <PostActionPanel
                    avatarWhoLikes={post.avatarWhoLikes}
                    id={post.id}
                    likesCount={post.likesCount}
                  />
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

                  <TimePublish createdAt={post.createdAt} />
                </div>

                <div className="flex flex-col gap-6 pl-6 py-6 overflow-y-auto">
                  {comments?.items.length > 0 ? (
                    comments?.items.map(comment => <Comment comment={comment} key={comment.id} />)
                  ) : (
                    <span>no comments</span>
                  )}
                </div>
              </div>
            </div>

            {/*<div className="h-fit">*/}
            {/*  <div className="w-full h-[1px] bg-dark-100" />*/}
            {/*  <div className="p-2 flex flex-col gap-2">*/}
            {/*    <LikesCounter avatarWhoLikes={post.avatarWhoLikes} likesCount={post.likesCount} />*/}
            {/*    <TimePublish createdAt={post.createdAt} />*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>
        )}
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
      {isOpenForEdit && (
        <CloseModal
          onClose={() => setIsOpenForEdit(false)}
          onDiscard={() => setStatus('INITIAL')}
          onDiscardText={'Yes'}
          onSave={() => setIsOpenForEdit(false)}
          onSaveString={'No'}
          text={
            'Do you really want to finish editing? If you close the changes you have made will not be saved'
          }
          title={t.createPost.close}
        />
      )}
    </Modal>
  )
}

export default PostModal
