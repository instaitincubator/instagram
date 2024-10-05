import { useState } from 'react'

import AvatarModal from '@/features/avatar/ui/avatar-modal'
import DefaultAvatar from '@/features/avatar/ui/default-avatar'
import DeleteAvatar from '@/features/avatar/ui/delete-avatar'
import DeleteButton from '@/features/avatar/ui/delete-button'
import {
  useDeleteProfileAvatarMutation,
  useGetProfileInfoQuery,
} from '@/services/profile/profileApi'
import { useTranslation } from '@/shared/hooks/useTranslation'
import Button from '@/shared/ui/Button/Button'
import Image from 'next/image'

export const Avatar = () => {
  const [deleteAvatar] = useDeleteProfileAvatarMutation()
  const { data } = useGetProfileInfoQuery()
  const [open, isOpen] = useState(false)
  const [openDelete, isOpenDelete] = useState(false)
  const handlerOpenModal = () => isOpen(true)
  const handlerCloseModal = () => isOpen(false)
  const handlerCloseDeleteModal = () => isOpenDelete(false)
  const handlerOpen = () => isOpenDelete(true)
  const { t } = useTranslation()
  const ava = data?.avatars?.[0]?.url
  const handlerDelete = () => {
    deleteAvatar().then(() => {
      isOpenDelete(false)
    })
  }

  return (
    <div className={'flex flex-col items-center'}>
      {data && data?.avatars.length > 0 ? (
        <div className="relative">
          <Image
            alt="avatar"
            className={
              'relative flex items-center justify-center w-48 h-48 overflow-hidden rounded-full mb-6'
            }
            fetchPriority={'high'}
            height={data?.avatars[0]?.height ?? 300}
            src={ava!}
            width={data?.avatars[0]?.width ?? 300}
          />
          <button
            className={
              'absolute border-4 top-2 right-6 bg-red-500 text-white  p-1 border-dark-700 rounded-full flex items-center justify-center cursor-pointer'
            }
            onClick={handlerOpen}
            type="button"
          >
            <DeleteButton />
          </button>
        </div>
      ) : (
        <DefaultAvatar
          className={'flex items-center justify-center w-48 h-48 overflow-hidden rounded-full mb-6'}
        />
      )}
      <Button onClick={handlerOpenModal} variant={'outline'}>
        {t.generalInformation.addProfilePhoto}
      </Button>
      {openDelete && (
        <DeleteAvatar onClose={handlerCloseDeleteModal} onDeleteAvatar={handlerDelete} />
      )}
      {open && <AvatarModal avatar={ava!} onClose={handlerCloseModal} />}
    </div>
  )
}
