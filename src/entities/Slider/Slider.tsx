import React, { useRef } from 'react'

import { Images } from '@/shared/types/public.types'
import Image from 'next/image'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { noImage } from '../../../public'

type Props = {
  arrImages: Images[]
  height: number
  openModal?: () => void
  width: number
}

export const Slider = ({ arrImages, height, openModal, width }: Props) => {
  const swiperRef = useRef<SwiperRef>(null)

  const rightHandleClick = () => {
    swiperRef?.current?.swiper.slideNext()
  }
  const leftHandleClick = () => {
    swiperRef?.current?.swiper.slidePrev()
  }

  return (
    <div className="relative cursor-pointer" style={{ width: '100%' }}>
      {arrImages.length > 1 ? (
        <>
          <Swiper loop modules={[Pagination]} pagination ref={swiperRef}>
            {arrImages.map((image, index) => {
              return (
                <SwiperSlide key={index}>
                  <Image
                    alt={'SlideImage'}
                    height={height}
                    onClick={openModal}
                    src={image.url}
                    width={width}
                  ></Image>
                </SwiperSlide>
              )
            })}
          </Swiper>
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
        </>
      ) : (
        <Image
          alt={'SlideImage'}
          height={height}
          onClick={openModal}
          src={arrImages.length ? arrImages[0].url : noImage}
          style={{ width: '100%' }}
          width={width}
        ></Image>
      )}
    </div>
  )
}
