import React from 'react'

import { EDIT_POST_STATUS } from '@/entities/Post/PostTypes'
import { MobilePostMenu } from '@/entities/Post/ui/MobilePostMenu'
import UserAvatar from '@/entities/UserAvatar/UserAvatar'
import { DropdownItem } from '@/features/dropdown/dropdown'
import useIsMobile from '@/shared/hooks/useIsMobile'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { PostsPublicItems } from '@/shared/types/ApiTypes/ProfileApiTypes'
import Button from '@/shared/ui/Button/Button'
import { cn } from '@/shared/utils/cn'
import Image from 'next/image'

interface Props {
  onClose: () => void
  post: PostsPublicItems
  setIsOpen: (isOpen: boolean) => void
  setStatus: (status: EDIT_POST_STATUS) => void
}

export const PostModalHeader = ({ onClose, post, setIsOpen, setStatus }: Props) => {
  const isMobile = useIsMobile(480)
  const { t } = useTranslation()

  return (
    <div className="flex justify-between items-center relative lg:hidden sm:px-8">
      <UserAvatar
        avatar={post.avatarOwner}
        userId={post.ownerId}
        userName={post.owner ? post.owner : post.userName}
      />
      <div className="flex gap-4">
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
            <Button className="flex gap-[12px]" onClick={() => setIsOpen(true)} variant="text">
              <Image alt="more" height={24} src="/basket.svg" width={24} />
              {t.postModal.deletePost}
            </Button>
          </DropdownItem>
        </MobilePostMenu>
        <button className={cn('h-6', { hidden: !isMobile })} onClick={onClose} type="button">
          <Image alt="close" height={24} src="/close.svg" width={24}></Image>
        </button>
      </div>
    </div>
  )
}
