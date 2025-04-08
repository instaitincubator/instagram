import React, { useState } from 'react'

import { UPLOAD_STEPS } from '@/features/create-post/CONST'
import CloseModal from '@/features/create-post/ul/close-modal/close-modal'
import CreateModal from '@/features/create-post/ul/create-modal/create-modal'
import { Publish } from '@/features/create-post/ul/publish/publish'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Modal } from '@/shared/ui/Modal/Modal'
import { cn } from '@/shared/utils/cn'
import { useRouter } from 'next/router'

import 'swiper/css'
import 'swiper/css/pagination'

export const CreatePost = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [uploadStep, setUploadStep] = useState(UPLOAD_STEPS.CHOOSE_PHOTO)
  const [openModal, setOpenModal] = useState(false)
  const closeModal = () => {
    if (router.pathname.split('/')[1] === 'public-profile') {
      const updateQuery = { ...router.query }

      delete updateQuery.createPost
      void router.back()
    } else {
      const updateQuery = { ...router.query }

      delete updateQuery.createPost
      void router.back()
    }
    setOpenModal(false)
  }

  return (
    <>
      <Modal
        className={
          'items-stretch z-50 justify-start bg-dark-700   mt-[60px] md:mt-0 md:fixed md:flex-col md:justify-center md:items-center md:rounded-xs md:text-light-100 md:z-10 md:bg-opacity-75'
        }
        contentClassName="items-center flex md:justify-center "
        modalClassName={cn(
          `bg-transparent border-none md:max-w-[75%]`,
          uploadStep === UPLOAD_STEPS.CHOOSE_PHOTO
            ? 'md:max-w-[75%]'
            : 'contents lg:flex lg:w-[70%] lg:min-w-[950px] w-[90%] min-w-[320px] h-auto'
        )}
        onClose={() => setOpenModal(true)}
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
      {openModal && (
        <CloseModal
          onClose={closeModal}
          onDiscard={closeModal}
          onDiscardText={t.createPost.discard}
          onSave={() => {}}
          onSaveString={t.createPost.saveDraft}
          text={t.createPost.closeModal}
          title={t.createPost.close}
        />
      )}
    </>
  )
}
