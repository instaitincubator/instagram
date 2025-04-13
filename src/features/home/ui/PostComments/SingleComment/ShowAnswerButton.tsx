import React from 'react'

import { useTranslation } from '@/shared/hooks/useTranslation'

interface Props {
  answerClassName?: string
  isAnswerShowed: boolean
  onShowAnswerClick: () => void
}

export const ShowAnswerButton = ({ isAnswerShowed, onShowAnswerClick }: Props) => {
  const { t } = useTranslation()

  return (
    <div className="flex items-center pl-9 gap-2 pb-2">
      <div className=" h-[2px] w-[30px] bg-dark-100" />
      <span className="opacity-50 cursor-pointer text-regular-14" onClick={onShowAnswerClick}>
        {!isAnswerShowed ? t.home.viewAnswers : t.home.hideAnswers}
      </span>
    </div>
  )
}
