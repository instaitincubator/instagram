import React from 'react'

import { useTranslation } from '@/shared/hooks/useTranslation'
import Button from '@/shared/ui/Button/Button'
import { Modal } from '@/shared/ui/Modal/Modal'
type ModalType = {
  onClose: () => void
  onDiscard: () => void
  onDiscardText: string
  onSave: () => void
  onSaveString: string
  text: string
  title: string
}
const CloseModal = ({
  onClose,
  onDiscard,
  onDiscardText,
  onSave,
  onSaveString,
  text,
  title,
}: ModalType) => {
  return (
    <Modal className={' mx-auto z-40'} onClose={onClose} title={title}>
      <p className={'whitespace-pre-wrap'}>{text}</p>
      <div className="flex w-full flex-col gap-2">
        <Button onClick={onDiscard} variant={'outline'}>
          {onDiscardText}
        </Button>
        <Button fullWidth onClick={onSave}>
          {onSaveString}
        </Button>
      </div>
    </Modal>
  )
}

export default CloseModal
