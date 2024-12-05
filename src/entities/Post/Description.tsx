import React from 'react'

type Props = {
  description: string
}

export const Description = ({ description }: Props) => {
  return (
    <div className="relative">
      <p className="break-words line-clamp-3">{description}</p>
      <button className="absolute block right-0 bottom-0 bg-dark-700 before:content-['...'] before:text-light-100 before:no-underline before:mr-[7px] text-regular-16 before:no-underline text-accent-500 ">
        Show more
      </button>
    </div>
  )
}
