import React, { ChangeEvent, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/store'
import { PostImage } from '@/entities/PostImage/PostImage'
import DefaultAvatar from '@/features/avatar/ui/default-avatar'
import DeleteButton from '@/features/avatar/ui/delete-button'
import CloseModal from '@/features/create-post/ul/close-modal/close-modal'
import PhotoList from '@/features/create-post/ul/photo-list/photo-list'
import { imageActions } from '@/services/create-post/postSlice'
import { useDeleteImageMutation, useUploadImageMutation } from '@/services/profile/postsApi'
import { useTranslation } from '@/shared/hooks/useTranslation'
import Button from '@/shared/ui/Button/Button'
import ExitButton from '@/shared/ui/exit-button/exit-button'
import { EditButton } from '@/shared/ui/icons/editButton'
import { saveImageHook } from '@/shared/utils/saveImage'
import Image from 'next/image'
import { useRouter } from 'next/router'
interface Props {
  backStep: () => void
}
const CreateModal = (props: Props) => {
  const { t } = useTranslation()
  const router = useRouter()
  const [open, setIsOpen] = useState(false)
  const dispatch = useAppDispatch()
  const { images } = useAppSelector(state => state.imageSlice)
  const [editButton, setEdit] = useState(false)
  const [uploadImage] = useUploadImageMutation()
  const [deleteImage] = useDeleteImageMutation()

  const removeImage = (index: string) => {
    deleteImage(index)
    dispatch(imageActions.removeImage(index))
  }
  const handlerOpenModal = () => {
    if (images.length === 0) {
      void router.push('/')
    } else {
      setIsOpen(true)
    }
  }
  const handlerCloseModal = () => {
    setIsOpen(false)
  }
  const handlerDiscardModal = () => {
    dispatch(imageActions.deleteState())
    setIsOpen(false)
    void router.push('/')
  }

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (files) {
      if (files.length <= 10) {
        for (let i = 0; i < files.length; i++) {
          if (files[i].size <= 21200000) {
            try {
              uploadImage(await saveImageHook(URL.createObjectURL(files[i]))).then(res =>
                dispatch(imageActions.setImage(res.data.images[0]))
              )
            } catch (e) {
              console.log(e)
            }
          } else {
            console.log('The photo must be less than 20 Mb and have JPEG or PNG format')
          }
        }
      } else {
        console.log('максимальное количество файлов (10)')
      }
    }
  }

  return (
    <div className="mx-[15px]  mt-[17px] md:bg-dark-300 md:border md:border-dark-100 md:px-0 md:py-0 md:mx-0 md:my-0">
      {/*header*/}
      <header className="flex justify-between items-center custom-wrapper md:flex-row  md:border-b-1 md:border-t-0  md:border-l-0 md:border-r-0 md:border md:border-dark-100 md:align-items-center md:py-[11px] md:px-[24px]">
        <div className="m-[6px]" onClick={handlerOpenModal}>
          <ExitButton />
        </div>
        <h2 className="text-h2">{t.createPost.newPublication}</h2>
        <Button
          className="px-0 contents"
          disabled={images.length === 0}
          onClick={() => {
            // setUploadStep(UPLOAD_STEPS.PUBLISH)
            props.backStep()
          }}
          type="button"
          variant="text"
        >
          <h2 className="text-h3 text-accent-500">{t.createPost.next}</h2>
        </Button>
      </header>
      {/*header*/}
      <div className=" mx-[54px] my-[19px] text-center overflow-hidden flex items-center md:mx-0 md:my-0 md:relative md:flex-grow">
        {images.length >= 1 ? (
          <>
            <div className="max-w-[252px] flex-shrink-0 m-auto md:max-w-[490px]">
              <PostImage arrImages={images} height={492} width={564} />
            </div>
            <div
              className={
                'absolute z-10 right-[11px] bottom-[11px] flex flex-col items-end gap-[2px] '
              }
            >
              {editButton && (
                <div
                  className={
                    'hidden invisible bg-dark-500 bg-opacity-80 rounded-[2px] p-[12px] items-start gap-[12px] md:flex md:visible'
                  }
                >
                  <PhotoList images={images} removeImage={removeImage} />
                  <label htmlFor="imageSelector">
                    <Button as="span" className={'contents'} variant={'outline'}>
                      <Image
                        alt={'circle'}
                        className={''}
                        height={32}
                        src={'/plus-circle-outline.svg'}
                        width={32}
                      />
                    </Button>
                    <input
                      accept="image/png, image/jpeg"
                      className="hidden"
                      id="imageSelector"
                      multiple
                      onChange={handleImageChange}
                      type="file"
                    />
                  </label>
                </div>
              )}
              <Image
                alt="image"
                className={'hidden  bg-dark-500 bg-opacity-80 rounded-[2px] md:block'}
                height={24}
                onClick={() => setEdit(!editButton)}
                src={'/image-outline.svg'}
                width={24}
              />
            </div>
          </>
        ) : (
          <div className={'w-full md:mx-[135px] md:mt-[72px] md:mb-[48px]'}>
            <DefaultAvatar className="max-w-252 max-h-252 md:w-[222px] md:h-[228px] md:mb-[60px]  w-full" />
            <div className="invisible hidden md:visible  md:flex md:gap-[24px] md:flex-col">
              <label htmlFor="imageSelector">
                <Button as="span">{t.createPost.selectFromDevice}</Button>
                <input
                  accept="image/png, image/jpeg"
                  className="hidden"
                  id="imageSelector"
                  multiple
                  onChange={handleImageChange}
                  type="file"
                />
              </label>
              <Button fullWidth variant={'outline'}>
                Open draft
              </Button>
            </div>
          </div>
        )}
      </div>
      {/*выбор фото мобайл*/}
      <div className={'md:hidden md:invisible'}>
        <div className="flex justify-between">
          <h1 className="text-medium-14 mb-[17px]">{t.createPost.myGallery}</h1>
          {images.length >= 1 && (
            <EditButton isActive={editButton} onClick={() => setEdit(!editButton)} />
          )}
        </div>
        <div>
          <div className="grid grid-cols-3 gap-[3px] pb-[12px]">
            {images.map((image, index) => (
              <div className="relative" key={index}>
                <Image
                  alt={`img-${index}`}
                  className={'object-contain overflow-hidden '}
                  height={108}
                  key={index}
                  src={image.url}
                  width={108}
                />
                {editButton && (
                  <button
                    className={
                      'bg-danger-500 right-[12px]  top-[6px] absolute p-[4px] rounded-[2px]'
                    }
                    onClick={() => removeImage(image.uploadId)}
                    type={'button'}
                  >
                    <DeleteButton />
                  </button>
                )}
              </div>
            ))}
          </div>
          <label htmlFor="imageSelector">
            <Button as="span">{t.createPost.selectFromDevice}</Button>
            <input
              accept="image/png, image/jpeg"
              className="hidden"
              id="imageSelector"
              multiple
              onChange={handleImageChange}
              type="file"
            />
          </label>
        </div>
      </div>

      {open && (
        <CloseModal onClose={handlerCloseModal} onDiscard={handlerDiscardModal} onSave={() => {}} />
      )}
    </div>
  )
}

export default CreateModal
