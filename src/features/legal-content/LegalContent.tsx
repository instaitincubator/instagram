import React from 'react'

import Button from '@/shared/ui/Button/Button'
import Image from 'next/image'
import { useRouter } from 'next/router'

type PropsType = {
  content: string
  labelButton: string
  title: string
}

export const LegalContent = ({ content, labelButton, title }: PropsType) => {
  const router = useRouter()

  const handleBackNavigate = () => router.back()

  return (
    <div>
      <div className="ml-[40px]">
        <Button className={'mt-[24px]'} onClick={handleBackNavigate} type="button" variant="text">
          <div className={'flex gap-[12px] text-white text-[14px]'}>
            <Image alt="ArrowBack" height={24} src="/arrow-back-outline.svg" width={24} />
            {labelButton}
          </div>
        </Button>
      </div>
      <div className="mx-[161px] flex flex-col items-center text-center ">
        <h1 className={'text-h1 my-[20px]'}>{title}</h1>
        <div className={'text-[14px]'}>{content}</div>
      </div>
    </div>
  )
}
