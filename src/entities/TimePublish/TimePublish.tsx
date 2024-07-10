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
    <div>
      <p>{formattedDate}</p>
    </div>
  )
}
