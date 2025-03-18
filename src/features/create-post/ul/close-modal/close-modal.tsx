import React from 'react'

import { useTranslation } from '@/shared/hooks/useTranslation'
import Button from '@/shared/ui/Button/Button'
import { Modal } from '@/shared/ui/Modal/Modal'
type ModalType = {
  onClose: () => void
  onDiscard: () => void
  onSave: () => void
}
const CloseModal = ({ onClose, onDiscard, onSave }: ModalType) => {
  const { t } = useTranslation()

  return (
    <Modal
      className={' max-w-[400px] px-2 mx-auto z-40'}
      onClose={onClose}
      title={t.createPost.close}
    >
      <p className={'whitespace-pre-wrap'}>{t.createPost.closeModal}</p>
      <div className="flex w-full flex-col gap-2">
        <Button onClick={onDiscard} variant={'outline'}>
          {t.createPost.discard}
        </Button>
        <Button fullWidth onClick={onSave}>
          {t.createPost.saveDraft}
        </Button>
      </div>
    </Modal>
  )
}

export default CloseModal
