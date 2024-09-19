import { useState } from 'react'

import AvatarModal from '@/features/avatar/ui/avatar-modal'
import DefaultAvatar from '@/features/avatar/ui/default-avatar'
import DeleteAvatar from '@/features/avatar/ui/delete-avatar'
import {
  useDeleteProfileAvatarMutation,
  useGetProfileInfoQuery,
} from '@/services/profile/profileAPi'
import { ProfileAvatars } from '@/shared/types/public.types'
import Button from '@/shared/ui/Button/Button'
import Image from 'next/image'

type AvatarProps = {
  avatar: ProfileAvatars
}
export const Avatar = () => {
  const [deleteAvatar] = useDeleteProfileAvatarMutation()
  const { data } = useGetProfileInfoQuery({})
  const [open, isOpen] = useState(false)
  const [openDelete, isOpenDelete] = useState(false)
  const handlerOpenModal = () => isOpen(true)
  const handlerCloseModal = () => isOpen(false)
  const handlerCloseDeleteModal = () => isOpenDelete(false)
  const handlerOpen = () => isOpenDelete(true)
  const ava = data?.avatars?.[0]?.url
  const handlerDelete = () => {
    deleteAvatar().then(() => {
      isOpenDelete(false)
    })
  }

  return (
    <div>
      {data?.avatars.length > 0 ? (
        <div className="relative">
          <Image
            alt="avatar"
            className={
              'relative flex items-center justify-center w-48 h-48 overflow-hidden rounded-full mb-6'
            }
            fetchPriority={'high'}
            height={data?.avatars[0]?.height ?? 300}
            src={ava}
            width={data?.avatars[0]?.width ?? 300}
          />

          <button
            className={
              'absolute top-2 right-6 bg-red-500 text-white  border-black rounded-full w-6 h-6 flex items-center justify-center cursor-pointer'
            }
            onClick={handlerOpen}
          >
            ✖
          </button>
        </div>
      ) : (
        <DefaultAvatar
          className={'flex items-center justify-center w-48 h-48 overflow-hidden rounded-full mb-6'}
        />
      )}
      <Button onClick={handlerOpenModal} variant={'outline'}>
        Add a Profile Photo
      </Button>
      {openDelete && (
        <DeleteAvatar onClose={handlerCloseDeleteModal} onDeleteAvatar={handlerDelete} />
      )}
      {open && <AvatarModal avatar={ava} onClose={handlerCloseModal} />}
    </div>
  )
}
