import React, { ChangeEvent, useRef, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/store'
import DefaultAvatar from '@/features/avatar/ui/default-avatar'
import DeleteButton from '@/features/avatar/ui/delete-button'
import EditButton from '@/features/create-post/ul/edit-button/EditButton'
import { imageActions } from '@/services/create-post/postSlice'
import { useGetUploadImageMutation } from '@/services/profile/postsApi'
import Button from '@/shared/ui/Button/Button'
import ExitButton from '@/shared/ui/exit-button/exit-button'
import { saveImageHook } from '@/shared/utils/saveImage'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'

import './style/style.css'
import 'swiper/css'
import { Modal } from "@/shared/ui/Modal/Modal";
const CreatePost = () => {
  const [uploadImage] = useGetUploadImageMutation()
  const swiperRef = useRef<SwiperRef>(null)
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const dispatch = useAppDispatch()
  const [editButton, setEdit] = useState(false)
  const router = useRouter()
  const imagess = useAppSelector(state => state.imageSlice.images)
  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (files) {
      if (files.length <= 10) {
        for (let i = 0; i < files.length; i++) {
          // console.log(typeof files[i])
          if (files[i].size <= 21200000) {
            try {
              uploadImage(await saveImageHook(URL.createObjectURL(files[i]))).then(res =>
                dispatch(imageActions.setImage(res.data.images[0]))
              )
            } catch (e) {
              console.log(e)
            }
          } else {
            console.log('The photo must be less than 20 Mb and have JPEG or PNG format}')
          }
        }
      } else {
        console.log('максимальное количество файлов (10)')
      }
    }
  }

  const saveImage = async () => {
    await router.push('/create-post/publish')
  }
  const handleSlideChange = (swiper: any) => {
    setCurrentSlide(swiper.activeIndex)
  }

  const removeImage = (index: string) => {
    // setImages(images.filter((_, i) => i !== index))
    dispatch(imageActions.removeImage(index))
  }

  return (
    <div className={'mx-[15px] mt-[17px]'}>
      <div className="flex justify-between items-center custom-wrapper">
        <div className={'m-[6px]'}>
          <ExitButton />
        </div>
        <h2 className={'text-h2'}> New Publication</h2>
        <Button
          className={' px-0 min-w-0 contents '}
          disabled={imagess.length === 0}
          onClick={saveImage}
          type={'button'}
          variant={'text'}
        >
          <h2 className={`text-h3 text-accent-500`}>Next</h2>
        </Button>
      </div>
      <div className="mx-[54px] my-[19px] text-center overflow-hidden flex items-center">
        {imagess.length >= 1 ? (
          <>
            <Swiper
              className={'flex items-center custom-wrapper'}
              loop
              modules={[Pagination]}
              onSlideChange={handleSlideChange}
              pagination
              ref={swiperRef}
            >
              {imagess.map((image, i) => {
                return (
                  <SwiperSlide key={image.uploadId} virtualIndex={i}>
                    <Image
                      alt={`image-${image.uploadId}`}
                      height={252}
                      src={image.url}
                      width={252}
                    />
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </>
        ) : (
          <DefaultAvatar className="max-w-252 max-h-252 " />
        )}
      </div>
      <div className="">
        <div className="flex justify-between">
          <h1 className={'text-medium-14 mb-[17px]'}> My Gallery</h1>
          <EditButton isActive={editButton} onClick={() => setEdit(!editButton)} />
        </div>
        <div>
          <div className={'grid grid-cols-3 gap-[3px] '}>
            {imagess.map((image, index) => (
              <div className={'relative'} key={index}>
                <Image
                  alt={`img-${index}`}
                  className={` object-contain overflow-hidden ${
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
          <label>
            <input
              accept="image/png, image/jpeg"
              className={'hidden'}
              multiple
              onChange={handleImageChange}
              type="file"
            />
            <Button as="span">Выбрать с устройства</Button>
          </label>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
