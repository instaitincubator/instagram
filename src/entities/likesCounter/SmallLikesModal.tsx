import React, { useEffect, useState } from 'react'

import { LikeItems } from '@/entities/likesCounter/queries/likesApiTypes'
import { useDeclension } from '@/shared/hooks/useDeclension'
import { useTranslation } from '@/shared/hooks/useTranslation'
import Image from 'next/image'

type Props = {
  isHovered: boolean
  likes?: LikeItems[]
  openLikesModal: () => void
}

export const SmallLikesModal = (props: Props) => {
  const { isHovered, likes, openLikesModal } = props
  const { locale, t } = useTranslation()
  const [hovered, setHovered] = useState(false)
  const [timeOutId, setTimeOutId] = useState<ReturnType<typeof setTimeout> | undefined>(undefined)

  const likesEnding = useDeclension(likes?.length, ['я', 'и', 'й'])

  console.log(isHovered, likes)
  useEffect(() => {
    if (isHovered) {
      setTimeOutId(
        setTimeout(() => {
          setHovered(isHovered)
        }, 1000)
      )
    } else {
      setHovered(false)
      clearTimeout(timeOutId)
    }
  }, [isHovered])

  return (
    <>
      {hovered && likes?.length ? (
        <div className="absolute bottom-[100%] flex gap-2 px-4 py-3 items-end border-amber-100 bg-dark-100 w-max rounded">
          <div className="flex gap-2 relative">
            {likes.slice(-3).map((userLiked, index) => {
              return (
                <Image
                  alt="likersAvatar"
                  className={`rounded-full z-[${10 + 10 * -index}] flex first:ml-0 ml-[-25px]`}
                  height={50}
                  key={index}
                  src={userLiked.avatars.length > 1 ? userLiked.avatars[1].url : '/avatar.png'}
                  width={50}
                />
              )
            })}
          </div>
          <div
            className="flex gap-1 items-end hover:text-accent-500 transition cursor-pointer"
            onClick={openLikesModal}
          >
            {likes.length}
            <span>{t.home.likesModal + likesEnding}</span>
          </div>
        </div>
      ) : null}
    </>
  )
}
