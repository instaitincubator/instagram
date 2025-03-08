import React, { ChangeEvent, useRef, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/store'
import DefaultAvatar from '@/features/avatar/ui/default-avatar'
import DeleteButton from '@/features/avatar/ui/delete-button'
import { UPLOAD_STEPS } from '@/features/create-post/CONST'
import CloseModal from '@/features/create-post/ul/close-modal/close-modal'
import { Publish } from '@/features/create-post/ul/publish/publish'
import { imageActions } from '@/services/create-post/postSlice'
import { useUploadImageMutation } from '@/services/profile/postsApi'
import Button from '@/shared/ui/Button/Button'
import { Modal } from '@/shared/ui/Modal/Modal'
import ExitButton from '@/shared/ui/exit-button/exit-button'
import { EditButton } from '@/shared/ui/icons/editButton'
import { saveImageHook } from '@/shared/utils/saveImage'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'

export const CreatePost = () => {
  const [open, setIsOpen] = useState(false)
  const [uploadStep, setUploadStep] = useState(UPLOAD_STEPS.CHOOSE_PHOTO)
  const [uploadImage] = useUploadImageMutation()
  const swiperRef = useRef<SwiperRef>(null)
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const dispatch = useAppDispatch()
  const [editButton, setEdit] = useState(false)
  const router = useRouter()
  const postImages = useAppSelector(state => state.imageSlice.images)
  // const [isOpen, setOpen ]
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

  const handleSlideChange = (swiper: any) => {
    setCurrentSlide(swiper.activeIndex)
  }

  const removeImage = (index: string) => {
    // setImages(images.filter((_, i) => i !== index))
    dispatch(imageActions.removeImage(index))
  }
  const handlerOpenModal = () => {
    if (postImages.length === 0) {
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
  const rightHandleClick = () => {
    swiperRef?.current?.swiper.slideNext()
  }
  const leftHandleClick = () => {
    swiperRef?.current?.swiper.slidePrev()
  }

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
        <div className="mx-[15px] mt-[17px] md:bg-dark-300 md:border md:border-dark-100 md:px-0 md:py-0 md:mx-0 md:my-0">
          <header className="flex justify-between items-center custom-wrapper md:flex-row-reverse  md:border-b-1 md:border-t-0  md:border-l-0 md:border-r-0 md:border md:border-dark-100 md:align-items-center md:py-[11px] md:px-[24px]">
            <div className="m-[6px]" onClick={handlerOpenModal}>
              <ExitButton />
            </div>
            <h2 className="text-h2">New Publication</h2>
            <Button
              className="px-0 "
              disabled={postImages.length === 0}
              onClick={() => {
                setUploadStep(UPLOAD_STEPS.PUBLISH)
              }}
              type="button"
              variant="text"
            >
              <h2 className="text-h3 text-accent-500">Next</h2>
            </Button>
          </header>
          <div className=" mx-[54px] my-[19px] text-center overflow-hidden flex items-center md:mx-0 md:my-0 md:relative md:flex-grow">
            {postImages.length >= 1 ? (
              <>
                <Swiper
                  className="flex items-center custom-wrapper w-full"
                  loop
                  modules={[Pagination]}
                  onSlideChange={handleSlideChange}
                  pagination={{ clickable: true }}
                  ref={swiperRef}
                >
                  {postImages.map((image, i) => {
                    return (
                      <SwiperSlide key={image.uploadId} virtualIndex={i}>
                        <Image
                          alt={`image-${image.uploadId}`}
                          className={'w-full'}
                          height={564}
                          src={image.url}
                          width={492}
                        />
                      </SwiperSlide>
                    )
                  })}
                </Swiper>
                {postImages.length > 1 && (
                  <div className="flex justify-between px-6">
                    <Image
                      alt="ArrowLeft"
                      className="absolute top-1/2 transform -translate-y-1/2 left-2 cursor-pointer z-10 "
                      height={24}
                      onClick={leftHandleClick}
                      src="/arrowLeftSlider.svg"
                      width={24}
                    />
                    <Image
                      alt="ArrowRight"
                      className="absolute top-1/2 transform -translate-y-1/2 right-2 cursor-pointer z-10"
                      height={24}
                      onClick={rightHandleClick}
                      src="/arrowRightSlider.svg"
                      width={24}
                    />
                  </div>
                )}
                <div
                  className={
                    'absolute z-10 right-[11px] bottom-[11px] flex flex-col items-end gap-[2px] '
                  }
                >
                  {editButton && (
                    <div
                      className={
                        'flex bg-dark-500 bg-opacity-80 rounded-[2px] p-[12px] items-start gap-[12px]'
                      }
                    >
                      {postImages.map((image, index) => (
                        <>
                          <div
                            className="relative  bg-dark-500 bg-opacity-80 rounded-[2px]"
                            key={index}
                          >
                            <Image
                              alt={`img-${index}`}
                              className={''}
                              height={82}
                              key={index}
                              src={image.url}
                              width={80}
                            />
                            <button
                              className={
                                'bg-danger-500 right-[2px]  top-[2px] absolute p-[4px] rounded-[2px]'
                              }
                              onClick={() => removeImage(image.uploadId)}
                              type={'button'}
                            >
                              <DeleteButton />
                            </button>
                          </div>
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
                        </>
                      ))}
                    </div>
                  )}
                  <Image
                    alt="image"
                    className={'bg-dark-500 bg-opacity-80 rounded-[2px]'}
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
                    <Button as="span">Выбрать с устройства</Button>
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
          <div className={'md:hidden md:invisible'}>
            <div className="flex justify-between">
              <h1 className="text-medium-14 mb-[17px]">My Gallery</h1>
              <EditButton isActive={editButton} onClick={() => setEdit(!editButton)} />
            </div>
            <div>
              <div className="grid grid-cols-3 gap-[3px]">
                {postImages.map((image, index) => (
                  <div className="relative" key={index}>
                    <Image
                      alt={`img-${index}`}
                      className={`object-contain overflow-hidden ${
                        currentSlide === index ? 'brightness-50' : 'brightness-100'
                      }`}
                      height={108}
                      key={index}
                      src={image.url}
                      width={108}
                    />
                    {editButton && (
                      <button
                        className={
                          'bg-danger-500 absolute bottom-[80px] left-[100px] p-[4px] rounded-[50%]'
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
                <Button as="span">Выбрать с устройства</Button>
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
            <CloseModal
              onClose={handlerCloseModal}
              onDiscard={handlerDiscardModal}
              onSave={() => {}}
            />
          )}
        </div>
      )}
      {uploadStep === UPLOAD_STEPS.PUBLISH && (
        <Publish backStep={() => setUploadStep(UPLOAD_STEPS.CHOOSE_PHOTO)} />
      )}
    </Modal>
  )
}
