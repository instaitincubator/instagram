import React, { useState } from 'react'

import { EDIT_POST_STATUS } from '@/entities/Post/PostTypes'
import { MobilePostMenu } from '@/entities/Post/ui/MobilePostMenu'
import PostEditMenu from '@/entities/Post/ui/PostEditMenu'
import { PostModalHeader } from '@/entities/Post/ui/PostModalHeader'
import { PostImage } from '@/entities/PostImage/PostImage'
import UserAvatar from '@/entities/UserAvatar/UserAvatar'
import PostModalComment from '@/features/PostModalComment/PostModalComment'
import CloseModal from '@/features/create-post/ul/close-modal/close-modal'
import { DropdownItem } from '@/features/dropdown/dropdown'
import { PostActionPanel } from '@/features/home/ui/PostActionPanel'
import { SendComment } from '@/features/home/ui/PostComments/SendComment'
import { usePublicationForm } from '@/features/publication-form/usePublicationForm'
import useIsMobile from '@/shared/hooks/useIsMobile'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { PostsPublicItems } from '@/shared/types/ApiTypes/ProfileApiTypes'
import { ControlledTextarea } from '@/shared/ui'
import Button from '@/shared/ui/Button/Button'
import { Modal } from '@/shared/ui/Modal/Modal'
import { cn } from '@/shared/utils/cn'
import Image from 'next/image'

interface Props {
  deletePostCallback: (id: number) => void
  editPost: (id: number, description: string) => void
  onClose: () => void
  post: PostsPublicItems
  showCommentsModal: () => void
}

const PostModal = ({ deletePostCallback, editPost, onClose, post, showCommentsModal }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenForEdit, setIsOpenForEdit] = useState(false)
  const [status, setStatus] = useState<EDIT_POST_STATUS.EDIT | EDIT_POST_STATUS.INITIAL>(
    EDIT_POST_STATUS.INITIAL
  )
  const isMobile = useIsMobile(480)
  const { t } = useTranslation()
  const { control, errors, handleSubmit } = usePublicationForm({ description: post.description })
  const onSubmit = (data: { description?: string }) => {
    if (data.description) {
      if (data.description === post.description) {
        setStatus(EDIT_POST_STATUS.INITIAL)
      } else {
        editPost(post.id, data.description)
        setStatus(EDIT_POST_STATUS.INITIAL)
      }
    }
  }
  const onCloseEditor = (data: { description?: string }) => {
    if (status === EDIT_POST_STATUS.INITIAL) {
      onClose()
    }
    if (data.description === post.description) {
      setStatus(EDIT_POST_STATUS.INITIAL)
    } else {
      setIsOpenForEdit(true)
    }
  }

  return (
    <Modal
      className="w-full md:mt-[60px] z-80"
      contentClassName="p-[15px] sm:p-0 pt-0 bg-dark-700 sm:bg-dark-300 sm:pt-0 items-start justify-between"
      headerClassName="h-[60px]"
      modalClassName={cn('lg:w-[50%] sm:w-[70%] lg:min-w-[1000px] w-[100%] min-w-[320px] h-auto', {
        'h-full bg-dark-700 mt-[59px]': isMobile,
      })}
      onClose={handleSubmit(onCloseEditor)}
      withOutHeader={isMobile}
      withOutHeaderButtonClassName="hidden"
    >
      <div className="sm:flex w-full flex-col lg:flex-row" key={post.id}>
        {status === EDIT_POST_STATUS.EDIT ? (
          <PostEditMenu onClose={handleSubmit(onCloseEditor)} onSubmit={handleSubmit(onSubmit)} />
        ) : (
          <PostModalHeader
            onClose={handleSubmit(onCloseEditor)}
            post={post}
            setIsOpen={setIsOpen}
            setStatus={setStatus}
          />
        )}

        <div className="lg:max-w-[490px] sm:pb-5 lg:pb-0 w-[95%] flex-shrink-0 m-auto">
          <PostImage arrImages={post.images} height={560} width={490} />
        </div>
        {status === EDIT_POST_STATUS.EDIT ? (
          <div className="h-fit sm:w-1/2 flex flex-col gap-[24px] pt-[20px] sm:p-[24px]">
            <div>
              <UserAvatar
                avatar={post.avatarOwner}
                userId={post.ownerId}
                userName={post.owner ? post.owner : post.userName}
              />
              <ControlledTextarea
                className="min-h-[120px] sm:h-100%"
                control={control}
                error={errors.description?.message}
                fullWidth
                label="Add publication descriptions"
                name="description"
                placeholder="Text-area"
              />
            </div>
            <div
              className="mt-auto hidden invisible sm:visible sm:flex"
              onClick={handleSubmit(onSubmit)}
            >
              <Button>{t.postModal.saveChanges}</Button>
            </div>
          </div>
        ) : (
          <div className="flex sm:px-[24px] flex-1 flex-col justify-start  overscroll-contain lg:max-h-[474px]">
            <div className="hidden justify-between items-center relative lg:flex">
              <UserAvatar
                avatar={post.avatarOwner}
                userId={post.ownerId}
                userName={post.owner ? post.owner : post.userName}
              />
              <MobilePostMenu>
                <DropdownItem>
                  <Button
                    className="flex gap-[12px]"
                    onClick={() => setStatus(EDIT_POST_STATUS.EDIT)}
                    variant="text"
                  >
                    <Image alt="more" height={24} src="/pen.svg" width={24} />
                    {t.postModal.editPost}
                  </Button>
                </DropdownItem>
                <DropdownItem>
                  <Button
                    className="flex gap-[12px]"
                    onClick={() => setIsOpen(true)}
                    variant="text"
                  >
                    <Image alt="more" height={24} src="/basket.svg" width={24} />
                    {t.postModal.deletePost}
                  </Button>
                </DropdownItem>
              </MobilePostMenu>
            </div>
            <div className="">
              <div className="w-full h-[1px] bg-dark-100" />
              <div className="flex  justify-around gap-[6px] md:gap-[10px] ld:gap-[30px]  flex-col md:flex-col  lg:flex-col-reverse ">
                <div className="relative bottom-0">
                  <PostActionPanel
                    id={post.id}
                    messageIconClassname={cn('bg-dark-300', { 'bg-dark-700': isMobile })}
                  />

                  <SendComment className={'hidden invisible lg:flex lg:visible'} postId={post.id} />
                </div>
                <PostModalComment
                  avatar={post.avatarOwner}
                  description={post.description}
                  ownerId={post.ownerId}
                  postId={post.id}
                  showCommentsModal={showCommentsModal}
                  username={post.userName}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      {isOpen && (
        <CloseModal
          onClose={() => setIsOpen(false)}
          onDiscard={() => deletePostCallback(post.id)}
          onDiscardText={t.generalInformation.yes}
          onSave={() => setIsOpen(false)}
          onSaveString={t.postModal.no}
          text={t.postModal.youWantDeletePost}
          title={t.createPost.close}
        />
      )}
      {isOpenForEdit && (
        <CloseModal
          onClose={() => setIsOpenForEdit(false)}
          onDiscard={() => setStatus(EDIT_POST_STATUS.INITIAL)}
          onDiscardText={t.generalInformation.yes}
          onSave={() => setIsOpenForEdit(false)}
          onSaveString={t.postModal.no}
          text={t.postModal.finishEditingPost}
          title={t.createPost.close}
        />
      )}
    </Modal>
  )
}

export default PostModal
