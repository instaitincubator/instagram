import React from 'react'

import Button from '@/shared/ui/Button/Button'
import { Modal } from '@/shared/ui/Modal/Modal'
import { cn } from '@/shared/utils/cn'

type ModalType = {
  buttonsClassName?: string
  className?: string
  hiddenOnStringClassName?: string
  onClose: () => void
  onDiscard?: () => void
  onDiscardText: string
  onSave: () => void
  onSaveString: string
  text: string
  textClassName?: string
  title: string
}
const CloseModal = ({
  buttonsClassName,
  className,
  hiddenOnStringClassName,
  onClose,
  onDiscard,
  onDiscardText,
  onSave,
  onSaveString,
  text,
  textClassName,
  title,
}: ModalType) => {
  return (
    <Modal
      className={cn('lg:max-w-[489px] mx-auto z-40', className)}
      onClose={onClose}
      title={title}
    >
      <p className={cn('whitespace-pre-wrap', textClassName)}>{text}</p>
      <div
        className={cn(
          'flex w-full flex-col gap-2 lg:w-[216px] lg:gap-[24px] lg:flex-row',
          buttonsClassName
        )}
      >
        <Button onClick={onDiscard} variant={'outline'}>
          {onDiscardText}
        </Button>

        <Button
          className={cn(
            'text-wrap leading-tight whitespace-normal px-[0]',
            hiddenOnStringClassName
          )}
          fullWidth
          onClick={onSave}
        >
          {onSaveString}
        </Button>
      </div>
    </Modal>
  )
}

export default CloseModal
