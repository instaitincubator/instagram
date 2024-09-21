import React from 'react'

import Button from '@/shared/ui/Button/Button'
import { Modal } from '@/shared/ui/Modal/Modal'

type PropsDelete = {
  onClose: () => void
  onDeleteAvatar: () => void
}
const DeleteAvatar = ({ onClose, onDeleteAvatar }: PropsDelete) => {
  return (
    <Modal onClose={onClose} title={'Delete Photo'}>
      <div>
        <h2 className={'w-300 text-regular-16 pt-3.5 pb-[58px] md:w-[390px]'}>
          Are you sure you want to delete the photo?
        </h2>
        <div className="flex gap-6 mb-5 justify-center md:justify-end">
          <Button onClick={onDeleteAvatar} variant={'outline'}>
            Yes
          </Button>
          <Button onClick={onClose}>No</Button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteAvatar
