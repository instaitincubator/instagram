import React, { useState } from 'react'

import Button from '@/shared/ui/Button/Button'
import { Modal } from '@/shared/ui/Modal/Modal'
import Image from 'next/image'

export const Avatar = () => {
  const [openModal, setOpenModal] = useState(false)

  const onclickHandler = () => {
    setOpenModal(true)
  }

  return (
    <>
      <div className="flex flex-col items-center gap-[24px]">
        <div className="relative w-[192px] h-[192px] rounded-full bg-dark-500">
          <div className="absolute inset-0 flex items-center justify-center">
            <Image alt="картинка" height={48} src="/avatar.svg" width={48} />
          </div>
        </div>

        <Button onClick={onclickHandler} variant="outline">
          Add a Profile Photo
        </Button>
      </div>
      {openModal && (
        <Modal
          className="flex w-full"
          onClose={() => setOpenModal(false)}
          title="Add a Profile Photo"
        >
          <div className="flex relative w-[192px] h-[192px] ">
            <div className="absolute inset-0 flex items-center justify-center bg-dark-900">
              <Image alt="картинка" height={48} src="/avatar.svg" width={48} />
            </div>
          </div>
          <Button onClick={() => setOpenModal(false)} type="button">
            OK
          </Button>
        </Modal>
      )}
    </>
  )
}
