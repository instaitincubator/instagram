import React from 'react'

import Button from '@/shared/ui/Button/Button'
import { Modal } from '@/shared/ui/Modal/Modal'
type ModalType = {
  onClose: () => void
  onDiscard: ()=> void
  onSave: () => void
}
const CloseModal = ({ onClose, onDiscard, onSave }: ModalType) => {
  return (
    <Modal onClose={onClose} title={'Close'}>
      <p className={'whitespace-pre-wrap'}>
        Do you really want to close the creation of a publication? If you close everything will be
        deleted
      </p>
      <div className="flex w-full flex-col flex-wrap-[">
        <Button onClick={onDiscard} variant={'outline'}>
          Discard
        </Button>
        <Button fullWidth onClick={onSave}>
          Save draft
        </Button>
      </div>
    </Modal>
  )
}

export default CloseModal
