import React from 'react'

import { useTranslation } from '@/shared/hooks/useTranslation'
import Button from '@/shared/ui/Button/Button'
import { Modal } from '@/shared/ui/Modal/Modal'

type PropsDelete = {
  onClose: () => void
  onDeleteAvatar: () => void
}
const DeleteAvatar = ({ onClose, onDeleteAvatar }: PropsDelete) => {
  const { t } = useTranslation()

  return (
    <Modal
      className={'bg-black bg-opacity-50  pt-[60px] md:backdrop-blur-0 md:justify-center'}
      onClose={onClose}
      title={t.generalInformation.deletePhoto}
    >
      <div>
        <h2 className={'w-300 text-regular-16 pt-3.5 pb-[58px] md:w-[390px]'}>
          {t.generalInformation.areYouSure}
        </h2>
        <div className="flex gap-6 mb-5 justify-center md:justify-end">
          <Button onClick={onDeleteAvatar} variant={'outline'}>
            {t.generalInformation.yes}
          </Button>
          <Button onClick={onClose}>{t.auth.no}</Button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteAvatar
