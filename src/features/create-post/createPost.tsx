import React, { useState } from 'react'

import { UPLOAD_STEPS } from '@/features/create-post/CONST'
import CreateModal from '@/features/create-post/ul/create-modal/create-modal'
import { Publish } from '@/features/create-post/ul/publish/publish'
import { Modal } from '@/shared/ui/Modal/Modal'

import 'swiper/css'
import 'swiper/css/pagination'

export const CreatePost = () => {
  const [uploadStep, setUploadStep] = useState(UPLOAD_STEPS.CHOOSE_PHOTO)

  return (
    <Modal
      className="my-[60px] items-stretch justify-start bg-dark-700 md:items-center md:relative md:justify-center md:rounded-xs"
      contentClassName="items-center block overflow-auto"
      modalClassName="bg-transparent border-none md:max-w-[75%]"
      onCloseClassname="hidden invisible"
      withOutHeader
      withOutHeaderButtonClassName="hidden"
    >
      {uploadStep === UPLOAD_STEPS.CHOOSE_PHOTO && (
        <CreateModal backStep={() => setUploadStep(UPLOAD_STEPS.PUBLISH)} />
      )}
      {uploadStep === UPLOAD_STEPS.PUBLISH && (
        <Publish backStep={() => setUploadStep(UPLOAD_STEPS.CHOOSE_PHOTO)} />
      )}
    </Modal>
  )
}
