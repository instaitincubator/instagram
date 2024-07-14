import React from 'react'

import Select from '@/shared/ui/Select/Select'
import { Option } from '@/shared/ui/Select/types'
import Image from 'next/image'
import { useRouter } from 'next/router'

import useIsMobile from '../../../../hooks/useIsMobile'

export const LanguageSelect = () => {
  const router = useRouter()

  const changeLangHandler = (option: Option) => {
    const locale = option.value
    const currentPath = router.asPath

    router.replace(currentPath, currentPath, { locale })
  }
  const isMobile = useIsMobile()

  const options = router.locales?.map(lg => {
    const imageSrc =
      lg === 'russian' ? (
        <Image alt="Russian Flag" height={24} src="/rus.svg" width={24} />
      ) : (
        <Image alt="USA Flag" height={24} src="/usa.svg" width={24} />
      )

    let label = ''

    if (!isMobile) {
      label = lg === 'russian' ? 'Русский' : 'English'
    }

    return {
      imageSrc,
      label,
      value: lg,
    }
  })

  return (
    <Select
      onChange={changeLangHandler}
      options={options!}
      value={options?.find(option => option.value === router.locale) || null}
    />
  )
}
