import React, { ChangeEvent, useRef, useState } from "react";
import { usePhotoEditor } from 'react-photo-editor'

import { getLayoutWithSidebar } from '@/app/layouts/layoutWithSidebar/LayoutWithSidebar'
import DefaultAvatar from '@/features/avatar/ui/default-avatar'
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
const CreatePost = () => {
  const [file, setFile] = useState<File | undefined>()
  const swiperRef = useRef<SwiperRef>(null)
  const { applyFilter, canvasRef, imageSrc } = usePhotoEditor({ file })
  const setFileData = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    if (e?.target?.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }
  const [images, setImages] = useState<string[]>([])
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (files) {
      const imageArray = Array.from(files).map(file => URL.createObjectURL(file))
      console.log(imageArray);
      setImages(imageArray)
    }
  }

  return (
    <div className={' mx-[15px] mt-[17px]'}>
      <div className="flex justify-between items-center">
        <div className={'m-[6px]'}>
          <svg
            fill="none"
            height="12"
            viewBox="0 0 12 12"
            width="12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.40994 6L11.7099 1.71C11.8982 1.5217 12.004 1.2663 12.004 1C12.004 0.733701 11.8982 0.478306 11.7099 0.290002C11.5216 0.101699 11.2662 -0.00408936 10.9999 -0.00408936C10.7336 -0.00408936 10.4782 0.101699 10.2899 0.290002L5.99994 4.59L1.70994 0.290002C1.52164 0.101699 1.26624 -0.00408936 0.999939 -0.00408936C0.733637 -0.00408935 0.478243 0.101699 0.289939 0.290002C0.101635 0.478306 -0.00415277 0.733701 -0.00415277 1C-0.00415278 1.2663 0.101635 1.5217 0.289939 1.71L4.58994 6L0.289939 10.29C0.196211 10.383 0.121816 10.4936 0.0710478 10.6154C0.0202791 10.7373 -0.00585938 10.868 -0.00585938 11C-0.00585938 11.132 0.0202791 11.2627 0.0710478 11.3846C0.121816 11.5064 0.196211 11.617 0.289939 11.71C0.382902 11.8037 0.493503 11.8781 0.615362 11.9289C0.737221 11.9797 0.867927 12.0058 0.999939 12.0058C1.13195 12.0058 1.26266 11.9797 1.38452 11.9289C1.50638 11.8781 1.61698 11.8037 1.70994 11.71L5.99994 7.41L10.2899 11.71C10.3829 11.8037 10.4935 11.8781 10.6154 11.9289C10.7372 11.9797 10.8679 12.0058 10.9999 12.0058C11.132 12.0058 11.2627 11.9797 11.3845 11.9289C11.5064 11.8781 11.617 11.8037 11.7099 11.71C11.8037 11.617 11.8781 11.5064 11.9288 11.3846C11.9796 11.2627 12.0057 11.132 12.0057 11C12.0057 10.868 11.9796 10.7373 11.9288 10.6154C11.8781 10.4936 11.8037 10.383 11.7099 10.29L7.40994 6Z"
              fill="white"
            />
          </svg>
        </div>
        <h2 className={'text-h2'}> New Publication</h2>
        <h3 className={'text-h3 text-accent-500 m-[6px]'}>Next</h3>
      </div>
      <div className="mx-[54px] my-[19px]">
        {/*{imageSrc ? (*/}
        {/*  <canvas*/}
        {/*    className={'max-w-[90%] max-h-[50%] ml-auto mr-auto flex flex-wrap gap-[20px]'}*/}
        {/*    ref={canvasRef}*/}
        {/*  />*/}
        {/*) : (*/}
        {/*  <DefaultAvatar />*/}
        {/*)}*/}
        {images.length > 1 ? (
          <>
            <Swiper loop modules={[Pagination]} pagination ref={swiperRef}>
              {images.map((image, i) => {
                return (
                  <SwiperSlide key={image}>
                    {/*<Image src={image[i]} width={'50'} height={'50'}/>*/}
                    <img alt={image} src={image} />
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </>
        ) : (
          ''
        )}
      </div>
      <div className="">
        <h1 className={'text-medium-14 mb-[17px]'}> My Gallery</h1>
        {/*<input multiple={false} onChange={e => setFileData(e)} type="file" />*/}
        <div>
          <input accept="image/*" multiple onChange={handleImageChange} type="file" />
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {' '}
            {images.map((image, index) => (
              <img
                alt={`img-${index}`}
                key={index}
                src={image}
                style={{ height: '100px', margin: '10px', width: '100px' }}
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
