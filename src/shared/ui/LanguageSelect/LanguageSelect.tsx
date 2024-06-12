import React from 'react'

import Select, { Option } from '@/shared/ui/Select/Select'
import Image from 'next/image'
import { useRouter } from 'next/router'

export const LanguageSelect = () => {
  const router = useRouter()

  const changeLangHandler = (option: Option) => {
    const locale = option.value

    router.push('/', '', { locale })
  }

  const options = router.locales?.map(lg => {
    const imageSrc =
      lg === 'russian' ? (
        <Image alt="Russian Flag" height={24} src="/rus.svg" width={24} />
      ) : (
        <Image alt="USA Flag" height={24} src="/usa.svg" width={24} />
      )

    return {
      imageSrc,
      label: lg,
      value: lg,
    }
  })

  return (
    <Select
      onChange={changeLangHandler}
      options={options!}
      value={{ label: router.locale!, value: router.locale! }}
    />
  )
}
