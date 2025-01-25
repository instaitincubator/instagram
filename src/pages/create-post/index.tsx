import React, { ChangeEvent, useRef, useState } from 'react'
import { usePhotoEditor } from 'react-photo-editor'

import { getLayoutWithSidebar } from '@/app/layouts/layoutWithSidebar/LayoutWithSidebar'
import { getLayout } from '@/app/layouts/mainLayout/Layout'
import DefaultAvatar from '@/features/avatar/ui/default-avatar'
import { useGetCreatePostMutation, useGetUploadImageMutation } from '@/services/profile/postsApi'
import ExitButton from '@/shared/ui/exit-button/exit-button'
import Image from 'next/image'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
const CreatePost = () => {
  const [uploadImage] = useGetUploadImageMutation()
  const [createPost] = useGetCreatePostMutation()
  const swiperRef = useRef<SwiperRef>(null)

  const [images, setImages] = useState<string[]>([])
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    debugger
    const files = event.target.files

    if (files) {
      const imageArray = Array.from(files).map(file => URL.createObjectURL(file))

      console.log(imageArray)
      setImages(imageArray)
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
            <Swiper loop modules={[Pagination]} pagination ref={swiperRef}>
              {images.map((image, i) => {
                return (
                  <SwiperSlide key={image}>
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
        {/*<input multiple={false} onChange={e => setFileData(e)} type="file" />*/}
        <div>
          <input accept="image/*" multiple onChange={handleImageChange} type="file" />
          <div className={'grid grid-cols-3 gap-[3px] '}>
            {' '}
            {images.map((image, index) => (
              <img
                alt={`img-${index}`}
                className={'h-[108px] w-[108px] object-contain overflow-hidden'}
                key={index}
                src={image}
              />
            ))}{' '}
          </div>
        </div>
      </div>
    </div>
  )
}

CreatePost.getLayout = getLayoutWithSidebar
export default CreatePost
