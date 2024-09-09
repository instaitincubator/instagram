import { useState } from 'react'
import avatarimg from '@/shared/assets/images/defaultAvatar.jpg'
import Button from '@/shared/ui/Button/Button'
import Image, { StaticImageData } from 'next/image'
import { useUploadAvatars } from '@/features/avatar/hooks/useUploadAvatars'
import AvatarModal from '@/features/avatar/ui/avatar-modal'

export const Avatar = () => {
 const [ava, setAva] = useState<StaticImageData | string>(avatarimg)

  const [open, isOpen] = useState(false)
  const handlerOpenModal = () => isOpen(true)
  const handlerCloseModal = () => isOpen(false)

  return (
    <div>
      <Image
        alt="avatar"
        className={'rounded-full'}
        fetchPriority={'high'}
        height={192}
        src={ava || avatarimg}
        width={192}
      />
      <Button onClick={handlerOpenModal} variant={'outline'}>
        Add a Profile Photo
      </Button>
      {open && <AvatarModal onClose={handlerCloseModal} onUploadSuccess={setAva} />}
    </div>
  )
}
