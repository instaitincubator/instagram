import { useEffect, useState } from 'react'

import { useUploadAvatars } from '@/features/avatar/hooks/useUploadAvatars'
import AvatarModal from '@/features/avatar/ui/avatar-modal'
import { useDeleteProfileAvatarMutation, useGetProfileQuery } from '@/services/profile/profileApi'
import avatarimg from '@/shared/assets/images/defaultAvatar.jpg'
import { Profile, ProfileAvatars } from '@/shared/types/public.types'
import Button from '@/shared/ui/Button/Button'
import Image, { StaticImageData } from 'next/image'

type AvatarProps = {
  avatar: ProfileAvatars
}
export const Avatar = () => {
  // const [ava, setAva] = useState<StaticImageData | string>(avatarimg)
  const [deleteAvatar] = useDeleteProfileAvatarMutation()
  const { data } = useGetProfileQuery()
  const [open, isOpen] = useState(false)
  const handlerOpenModal = () => isOpen(true)
  const handlerCloseModal = () => isOpen(false)

  return (
    <div>
      <div className="relative">
        <Image
          alt="avatar"
          className={
            'relative flex items-center justify-center w-48 h-48 overflow-hidden rounded-full mb-6'
          }
          fetchPriority={'high'}
          height={data?.avatars[0]?.height ?? 300}
          src={data?.avatars[0]?.url ?? avatarimg}
          width={data?.avatars[0]?.width ?? 300}
        />
        <button
          className={
            'absolute top-2 right-6 bg-red-500 text-white rounded border-black rounded-full w-6 h-6 flex items-center justify-center cursor-pointer'
          }
          onClick={() => deleteAvatar()}
        >
          ✖
        </button>
      </div>
      <Button onClick={handlerOpenModal} variant={'outline'}>
        Add a Profile Photo
      </Button>
      {open && (
        <AvatarModal avatar={data?.avatars[0]?.url ?? avatarimg} onClose={handlerCloseModal} />
      )}
    </div>
  )
}
