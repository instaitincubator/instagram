import React, { useEffect, useRef, useState } from 'react'

import { useTranslation } from '@/shared/hooks/useTranslation'
import { motion } from 'framer-motion'

type Props = {
  description: string
  isShowedText: boolean
  toggleShowedText: () => void
}

export const Description = ({ description, isShowedText, toggleShowedText }: Props) => {
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const [isClampedText, setIsClampedText] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    if (descriptionRef.current) {
      setIsClampedText(descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight)
    }
  }, [descriptionRef.current])

  return (
    <div className="relative max-h-[192px] overflow-auto">
      <motion.p
        animate={{ display: isShowedText ? 'inline' : '-webkit-box' }}
        className={`break-words line-clamp-3 ${isShowedText ? 'inline' : ''}`}
        initial={{ display: isShowedText ? '-webkit-box' : 'inline' }}
        ref={descriptionRef}
        transition={{ duration: 5 }}
      >
        {description}&nbsp;
      </motion.p>
      {isShowedText && (
        <button
          className="bg-dark-700 text-regular-16 text-accent-500 mar"
          onClick={toggleShowedText}
          type="button"
        >
          {t.profile.hide}
        </button>
      )}
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
