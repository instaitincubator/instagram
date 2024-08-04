import React, { FC, PropsWithChildren, useEffect } from 'react'

import { cn } from '@/shared/utils/cn'
import Image from 'next/image'

export interface ModalProps {
  className?: string
  onClose?: () => void
  title?: string
  withOutHeader?: boolean
}

export const Modal: FC<PropsWithChildren<ModalProps>> = props => {
  const { children, className, onClose, title, withOutHeader } = props

  useEffect(() => {
    const handleClose = (event: KeyboardEvent): void => {
      event.key === 'Escape' && onClose?.()
    }

    window.addEventListener('keydown', handleClose)

    return () => {
      window.removeEventListener('keydown', handleClose)
    }
  }, [onClose])

  return (
    <div
      className={cn(
        'fixed z-30 inset-0 flex flex-col items-center justify-center text-light-100',
        className
      )}
    >
      <div
        className="fixed inset-0 z-40 w-full h-full bg-dark-900 bg-opacity-20"
        onClick={onClose}
      />
      <div className="bg-dark-300 z-50 overflow-auto border border-dark-100">
        {!withOutHeader ? (
          <header className="flex justify-between items-center px-6 py-3 border-b border-dark-100">
            <h2 className="text-h1">{title}</h2>
            <button className="h-6" onClick={onClose} type={'button'}>
              <Image alt="close" height={24} src="/close.svg" width={24}></Image>
            </button>
          </header>
        ) : (
          <button
            className="h-6 absolute top-[10%] transform -translate-y-1/2 right-[23%]"
            onClick={onClose}
            type={'button'}
          >
            <Image alt="close" height={24} src="/close.svg" width={24}></Image>
          </button>
        )}
        <div className="flex flex-col items-end flex-grow px-6 py-4 gap-5 ">{children}</div>
      </div>
    </div>
  )
}
