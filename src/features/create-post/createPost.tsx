import React, { ChangeEvent, useRef, useState } from 'react'

import { useAppDispatch } from '@/app/store'
import DefaultAvatar from '@/features/avatar/ui/default-avatar'
import DeleteButton from '@/features/avatar/ui/delete-button'
import EditButton from '@/features/create-post/ul/edit-button/EditButton'
import { imageActions } from '@/services/create-post/postSlice'
import { useGetUploadImageMutation } from '@/services/profile/postsApi'
import Button from '@/shared/ui/Button/Button'
import ExitButton from '@/shared/ui/exit-button/exit-button'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'

import './style/style.css'
import 'swiper/css'
const CreatePost = () => {
  const [uploadImage] = useGetUploadImageMutation()
  const swiperRef = useRef<SwiperRef>(null)
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [images, setImages] = useState<string[]>([])
  const dispatch = useAppDispatch()
  const [editButton, setEdit] = useState(false)
  const router = useRouter()
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (files) {
      if (files.length <= 10) {
        const imageArray = Array.from(files)
          .filter(file => file.size <= 21200000)
          .map(file => URL.createObjectURL(file))

        setImages(imageArray)
      } else {
        console.log('Превышено максимальное количество файлов (10)')
      }
    } else {
      console.log('error')
    }
  }

  const saveImage = async () => {
    for (let i = 0; i < images.length; i++) {
      const response = await fetch(images[i])
      const blob = await response.blob()
      const file = new File([blob], `avatar${i}.png`, { type: blob.type })

      const formData = new FormData()

      formData.append('file', file)
      try {
        await uploadImage(formData).then(res => dispatch(imageActions.setImage(res.data.images[0])))
      } catch (error) {
        console.log(error)
      }
    }
    await router.push('/create-post/publish')
  }
  const handleSlideChange = (swiper: any) => {
    setCurrentSlide(swiper.activeIndex)
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  return (
    <div className={'mx-[15px] mt-[17px]'}>
      <div className="flex justify-between items-center custom-wrapper">
        <div className={'m-[6px]'}>
          <ExitButton />
        </div>
        <h2 className={'text-h2'}> New Publication</h2>
        <h3 className={'text-h3 text-accent-500 m-[6px]'} onClick={saveImage}>
          Next
        </h3>
      </div>
      <div className="mx-[54px] my-[19px] text-center overflow-hidden flex items-center">
        {images.length >= 1 ? (
          <>
            <Swiper
              className={'flex items-center custom-wrapper'}
              loop
              modules={[Pagination]}
              onSlideChange={handleSlideChange}
              pagination
              ref={swiperRef}
            >
              {images.map((image, i) => {
                return (
                  <SwiperSlide key={image} virtualIndex={i}>
                    <Image alt={`image-${i}`} height={252} src={image} width={252} />
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
            {images.map((image, index) => (
              <div className={'relative'} key={index}>
                <img
                  alt={`img-${index}`}
                  className={` h-[108px] w-[108px] object-contain overflow-hidden ${
                    currentSlide === index ? 'brightness-50' : 'brightness-100'
                  }`}
                  key={index}
                  src={image}
                />

                {editButton && (
                  <button
                    className={
                      'bg-danger-500 absolute bottom-[80px] left-[100px] p-[4px] rounded-[50%]'
                    }
                    onClick={() => removeImage(index)}
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
