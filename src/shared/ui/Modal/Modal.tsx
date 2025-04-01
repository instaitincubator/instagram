import React, { FC, PropsWithChildren, ReactNode, useEffect } from 'react'

import useIsMobile from '@/shared/hooks/useIsMobile'
import { cn } from '@/shared/utils/cn'
import Image from 'next/image'

export interface ModalProps {
  className?: string
  contentClassName?: string
  headerClassName?: string
  modalClassName?: string
  onClose?: () => void
  onCloseClassname?: string
  title?: ReactNode | string
  withOutHeader?: boolean
  withOutHeaderButtonClassName?: string
}

export const Modal: FC<PropsWithChildren<ModalProps>> = props => {
  const {
    children,
    className,
    contentClassName,
    headerClassName,
    modalClassName,
    onClose,
    onCloseClassname,
    title,
    withOutHeader,
    withOutHeaderButtonClassName,
  } = props
  const isMobile = useIsMobile(479)

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
        'fixed z-1 inset-0 flex flex-col items-center justify-center text-light-100',
        className
      )}
    >
      <div
        className={cn(
          'fixed inset-0 z-40 w-full h-full bg-dark-900 bg-opacity-20',
          onCloseClassname
        )}
        onClick={!isMobile ? onClose : undefined}
      />
      <div className={cn('bg-dark-300 z-50 overflow-auto border border-dark-100', modalClassName)}>
        {!withOutHeader ? (
          <header
            className={cn(
              'flex justify-between items-center px-6 py-3 border-b border-dark-100',
              headerClassName
            )}
          >
            <h2 className="text-h1">{title}</h2>
            <button className="h-6" onClick={onClose} type={'button'}>
              <Image alt="close" height={24} src="/close.svg" width={24}></Image>
            </button>
          </header>
        ) : (
          <button
            className={cn(
              'h-6 absolute top-[10%] transform -translate-y-1/2 right-[23%]',
              withOutHeaderButtonClassName
            )}
            onClick={onClose}
            type="button"
          >
            <Image alt="close" height={24} src="/close.svg" width={24}></Image>
          </button>
        )}
        <div className={cn('flex flex-col items-end flex-grow px-6 py-4 gap-5', contentClassName)}>
          {children}
        </div>
      </div>
    </div>
  )
}
