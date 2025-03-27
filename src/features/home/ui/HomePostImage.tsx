import React, { useRef } from 'react'

import {
  useGetPostLikeStatusQuery,
  useUpdateLikeStatusMutation,
} from '@/entities/likesCounter/queries/likes-api'
import { homePagePostImages } from '@/services/home-posts/home-page-types'
import Image from 'next/image'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'

import { noImage } from '../../../../public'

interface Props {
  images: homePagePostImages[]
  postId: number
}

export const HomePostImage = ({ images, postId }: Props) => {
  const swiperRef = useRef<SwiperRef>(null)

  const rightHandleClick = () => {
    swiperRef?.current?.swiper.slideNext()
  }
  const leftHandleClick = () => {
    swiperRef?.current?.swiper.slidePrev()
  }
  const { data: postLikeStatus } = useGetPostLikeStatusQuery(postId!)
  const [updateLikeStatus] = useUpdateLikeStatusMutation()

  const onLike = () => {
    if (postId) {
      updateLikeStatus({
        likeStatus: postLikeStatus?.isLiked ? 'NONE' : 'LIKE',
        postId: postId,
      })
    }
  }

  return (
    <div className="relative">
      {images.length > 1 ? (
        <div className="relative">
          <Swiper loop modules={[Pagination]} pagination ref={swiperRef}>
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <Image
                  alt={'SlideImage'}
                  className="w-full"
                  height={image.height}
                  onDoubleClick={onLike}
                  src={image.url}
                  width={image.width}
                />
              </SwiperSlide>
            ))}
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
        </div>
      ) : (
        <Image
          alt={'SlideImage'}
          className="w-full"
          height={images[0].height}
          onDoubleClick={onLike}
          src={images.length ? images[0].url : noImage}
          width={images[0].width}
        />
      )}
    </div>
  )
}
