import React from 'react'

import { Comment } from '@/entities/Post/Comment'
import { EDIT_POST_STATUS } from '@/entities/Post/PostTypes'
import { PostModalHeader } from '@/entities/Post/ui/PostModalHeader'
import { PostImage } from '@/entities/PostImage/PostImage'
import { TimePublish } from '@/entities/TimePublish/TimePublish'
import UserAvatar from '@/entities/UserAvatar/UserAvatar'
import CloseModal from '@/features/create-post/ul/close-modal/close-modal'
import { DropdownItem } from '@/features/dropdown/dropdown'
import { MobilePostMenu } from '@/features/home/ui/MobilePostMenu'
import { PostActionPanel } from '@/features/home/ui/PostActionPanel'
import { usePublicationForm } from '@/features/publication-form/usePublicationForm'
import useIsMobile from '@/shared/hooks/useIsMobile'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { PostsPublicItems } from '@/shared/types/ApiTypes/ProfileApiTypes'
import { CommentForPost } from '@/shared/types/public.types'
import { ControlledTextarea } from '@/shared/ui'
import Button from '@/shared/ui/Button/Button'
import { Modal } from '@/shared/ui/Modal/Modal'
import { cn } from '@/shared/utils/cn'
import Image from 'next/image'

interface Props {
  comments: CommentForPost
  deletePostCallback: (id: number) => void
  editPost: (id: number, description: string) => void
  onClose: () => void
  post: PostsPublicItems
}

const PostModal = ({ comments, deletePostCallback, editPost, onClose, post }: Props) => {
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
      className="w-full z-80"
      contentClassName="p-[15px] sm:p-0 pt-0 bg-dark-700 sm:bg-dark-300 sm:pt-0 items-start justify-between"
      headerClassName="h-[60px]"
      modalClassName={cn('lg:w-[50%] sm:w-[80%] lg:min-w-[1000px] w-[100%] min-w-[320px] h-auto', {
        'h-full bg-dark-700 mt-[59px]': isMobile,
      })}
      onClose={handleSubmit(onCloseEditor)}
      withOutHeader={isMobile}
      withOutHeaderButtonClassName="hidden"
    >
      <div className="sm:flex w-full flex-col lg:flex-row" key={post.id}>
        {status === EDIT_POST_STATUS.EDIT ? (
          <div className="flex items-center sm:hidden sm:invisible justify-between py-[18px]">
            <Button className="text-h3" onClick={handleSubmit(onCloseEditor)} variant="text">
              {t.postModal.cancel}
            </Button>
            <h2 className="text-h2">{t.postModal.editPost}</h2>
            <Button
              className="text-h3 text-accent-500"
              onClick={handleSubmit(onSubmit)}
              variant="text"
            >
              {t.postModal.save}
            </Button>
          </div>
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
          <div className="flex sm:px-[24px] flex-1 flex-col justify-between max-h-[474px]">
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
            <div className="h-fit">
              <div className="w-full h-[1px] bg-dark-100" />
              <div className="flex justify-around flex-col sm:flex-col-reverse">
                <div className="p-2 flex flex-col gap-2">
                  <PostActionPanel
                    id={post.id}
                    messageIconClassname={cn('bg-dark-300', { 'bg-dark-700': isMobile })}
                  />
                  <article className="flex flex-wrap  gap-1">
                    <h2 className="text-bold-14  font-bold   whitespace-nowrap text-base">
                      {post.userName}
                    </h2>
                    <h1 className="break-words whitespace-normal overflow-hidden leading-relaxed max-w-full text-sm">
                      {post.description}
                    </h1>
                  </article>
                  <TimePublish createdAt={post.createdAt} />
                </div>

                <div className="flex flex-col gap-6 pl-6 py-6 overflow-y-auto">
                  {comments?.items.length > 0 ? (
                    comments?.items.map(comment => <Comment comment={comment} key={comment.id} />)
                  ) : (
                    <span>{t.postModal.noComments}</span>
                  )}
                </div>
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
