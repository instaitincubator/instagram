import React from 'react'

import { Images } from '@/shared/types/public.types'
import Image from 'next/image'

type Props = {
  arrImages: Images[]
  height: number
  openModal?: () => void
  width: number
}

export const Slider = ({ arrImages, height, openModal, width }: Props) => {
  const [imageIndex, setImageIndex] = React.useState(0)

  const rightHandleClick = () => {
    setImageIndex(prevIndex => (prevIndex === 0 ? arrImages.length - 1 : prevIndex - 1))
  }
  const leftHandleClick = () => {
    setImageIndex(prevIndex => (prevIndex === arrImages.length - 1 ? 0 : prevIndex + 1))
  }

  return (
    <div className="relative ">
      <Image
        alt={'SlideImage'}
        height={height}
        onClick={openModal}
        src={arrImages[imageIndex].url}
        width={width}
      ></Image>
      {arrImages.length > 1 && (
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
          <div className="absolute bottom-[8px] left-[45%] cursor-pointer">
            <div className="flex gap-[8px] justify-center px-[8px] py-[3px] bg-dark-100 rounded-[4px]">
              {arrImages.map((el, i) => (
                <div
                  className={`w-[8px] h-[8px] z-20 ${i === imageIndex ? 'bg-accent-500' : 'bg-light-100'} rounded-full`}
                  key={i}
                  onClick={() => setImageIndex(i)}
                ></div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
