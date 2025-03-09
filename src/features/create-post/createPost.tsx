import React, { useState } from 'react'

import { UPLOAD_STEPS } from '@/features/create-post/CONST'
import CreateModal from '@/features/create-post/ul/create-modal/create-modal'
import { Publish } from '@/features/create-post/ul/publish/publish'
import { Modal } from '@/shared/ui/Modal/Modal'
import { cn } from '@/shared/utils/cn'

import 'swiper/css'
import 'swiper/css/pagination'

export const CreatePost = () => {
  const [uploadStep, setUploadStep] = useState(UPLOAD_STEPS.CHOOSE_PHOTO)

  return (
    <Modal
      className="my-[60px] items-stretch justify-start bg-dark-700 md:items-center md:absolute md:justify-center md:rounded-xs"
      contentClassName="items-center block "
      modalClassName={cn(
        `bg-transparent border-none md:max-w-[75%]`,
        uploadStep === UPLOAD_STEPS.CHOOSE_PHOTO
          ? 'md:max-w-[75%]'
          : 'lg:w-[70%] lg:min-w-[950px] w-[90%] min-w-[320px] h-auto'
      )}
      onCloseClassname="hidden invisible md:flex md:visible"
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
