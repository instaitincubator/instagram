import React from 'react'

import { formatDistanceToNowStrict, parseISO } from 'date-fns'
import { enUS, ru } from 'date-fns/locale'
import { useRouter } from 'next/router'
type Props = {
  createdAt: string
}

export const TimePublish = ({ createdAt }: Props) => {
  const { locale } = useRouter()
  const formattedDate = formatDistanceToNowStrict(parseISO(createdAt as string), {
    addSuffix: true,
    locale: locale === 'russian' ? ru : enUS,
  })

  return (
    <div className="mb-[3px]">
      <p className="text-small text-light-900">{formattedDate}</p>
    </div>
  )
}
