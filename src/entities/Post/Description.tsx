import React, { useEffect, useRef, useState } from 'react'

import { useTranslation } from '@/shared/hooks/useTranslation'
import { motion } from 'framer-motion'

type Props = {
  description?: string
  isShowedText: boolean
  toggleShowedText: () => void
}

export const Description = ({ description, isShowedText, toggleShowedText }: Props) => {
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const [isClampedText, setIsClampedText] = useState(true)
  const { t } = useTranslation()

  useEffect(() => {
    if (descriptionRef.current) {
      setIsClampedText(descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight)
    }
  }, [descriptionRef.current])

  return (
    <div className={`relative max-h-[192px] ${isShowedText ? 'overflow-auto' : 'overflow-hidden'}`}>
      <motion.p
        animate={{
          maxHeight: isShowedText ? '192px' : '72px',
        }}
        className={`break-words ${isShowedText ? 'line-clamp-none' : 'line-clamp-none'} max-h-[${isShowedText ? '192px' : '72px'}]`}
        initial={{
          maxHeight: '72px',
        }}
        ref={descriptionRef}
        transition={{ duration: 0.2 }}
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur doloribus
        expedita fugit ipsa laboriosam libero numquam omnis pariatur quo quos sapiente similique
        suscipit, temporibus vel velit voluptatibus. Quis, sapiente!
        {description}&nbsp;
        {isShowedText && (
          <button
            className="bg-dark-700 text-regular-16 text-accent-500 "
            onClick={toggleShowedText}
            type="button"
          >
            {t.profile.hide}
          </button>
        )}
      </motion.p>

      {isClampedText && !isShowedText && (
        <button
          className="absolute block right-0 bottom-0 bg-dark-700 before:content-['...'] before:text-light-100 before:no-underline before:mr-[7px] text-regular-16 before:no-underline text-accent-500 "
          onClick={toggleShowedText}
          type="button"
        >
          {t.profile.showMore}
        </button>
      )}
    </div>
  )
}
