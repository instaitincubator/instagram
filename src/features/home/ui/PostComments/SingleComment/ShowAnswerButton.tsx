import React from 'react'

interface Props {
  isAnswerShowed: boolean
  onShowAnswerClick: () => void
}

export const ShowAnswerButton = ({ isAnswerShowed, onShowAnswerClick }: Props) => {
  return (
    <div className="flex items-center pl-9 gap-2 pb-2">
      <div className=" h-[2px] w-[30px] bg-dark-100" />
      <span className="opacity-50 cursor-pointer text-regular-14" onClick={onShowAnswerClick}>
        {!isAnswerShowed ? 'View answers' : 'hide answers'}
      </span>
    </div>
  )
}
