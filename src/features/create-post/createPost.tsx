import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

import DefaultAvatar from '@/features/avatar/ui/default-avatar'
import { useGetCreatePostMutation, useGetUploadImageMutation } from '@/services/profile/postsApi'
import Button from '@/shared/ui/Button/Button'
import ExitButton from '@/shared/ui/exit-button/exit-button'
import Image from 'next/image'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperRef, SwiperSlide, useSwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const CreatePost = () => {
  const [uploadImage] = useGetUploadImageMutation()
  const [createPost] = useGetCreatePostMutation()
  const swiperRef = useRef<any>(null)
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [images, setImages] = useState<string[]>([])
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    console.log(files)
    if (files) {
      const imageArray = Array.from(files).map(file => URL.createObjectURL(file))

      console.log(imageArray)
      setImages(imageArray)
    } else {
      console.log('error')
    }
  }

  const saveImage = async () => {
    const dataUrl = images[0]
    const response = await fetch(dataUrl)
    const blob = await response.blob()
    const file = new File([blob], 'avatar.png', { type: blob.type })

    const formData = new FormData()

    formData.append('file', file) // Append the file to FormData

    try {
      await uploadImage(formData)
        .then(res => {
          createPost({
            childrenMetadata: res.data.images.map((image: any) => ({ uploadId: image.uploadId })),
            description: 'Test',
          })
        })
        .catch(error => {
          console.log('create error' + error)
        })
    } catch (error) {
      console.log('error: ', error)
    }
  }
  const handleSlideChange = (swiper: any) => {
    setCurrentSlide(swiper.activeIndex)
  }

  const goToSlide = (index: number) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index)
    }
  }

  return (
    <div className={'mx-[15px] mt-[17px]'}>
      <div className="flex justify-between items-center">
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
              loop
              modules={[Pagination]}
              onSlideChange={handleSlideChange}
              pagination
              ref={swiperRef}
            >
              {images.map((image, i) => {
                return (
                  <SwiperSlide key={image} ref={swiperRef} virtualIndex={i}>
                    <Image alt={'fifif'} height={252} src={image} width={252} />
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
        <h1 className={'text-medium-14 mb-[17px]'}> My Gallery</h1>
        <div>
          <div className={'grid grid-cols-3 gap-[3px] '}>
            {images.map((image, index) => (
              <img
                alt={`img-${index}`}
                className={`h-[108px] w-[108px] object-contain overflow-hidden ${
                  currentSlide === index ? 'brightness-50' : 'brightness-100'
                }`}
                key={index}
                onClick={() => goToSlide(index)}
                src={image}
              />
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
