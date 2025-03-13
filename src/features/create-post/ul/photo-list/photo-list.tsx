import React, { FC, PropsWithChildren } from 'react'

import DeleteButton from '@/features/avatar/ui/delete-button'
import { ImagesType } from '@/services/create-post/postSlice'
import { cn } from '@/shared/utils/cn'
import Image from 'next/image'
import { className } from 'postcss-selector-parser'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

type ListProps = {
  className?: string
  images: ImagesType[]
  removeImage: (removeId: string) => void
}
const PhotoList: FC<PropsWithChildren<ListProps>> = props => {
  const { className, images, removeImage } = props

  return (
    <div className={'relative w-[300px] overflow-hidden'}>
      <Swiper slidesPerView={3} spaceBetween={3}>
        {images.map((image, index) => {
          return (
            <SwiperSlide key={index}>
              <div
                className="relative flex justify-center bg-dark-500 bg-opacity-80 rounded-[2px] "
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
                  className={'bg-danger-500 right-[12px]  top-[6px] absolute p-[4px] rounded-[2px]'}
                  onClick={() => removeImage(image.uploadId)}
                  type={'button'}
                >
                  <DeleteButton />
                </button>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default PhotoList
