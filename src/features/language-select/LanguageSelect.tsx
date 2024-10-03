import React from 'react'

import useIsMobile from '@/shared/hooks/useIsMobile'
import Select from '@/shared/ui/Select/Select'
import { Option } from '@/shared/ui/Select/types'
import { cn } from '@/shared/utils/cn'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { types } from 'sass'

import String = types.String

export const LanguageSelect = () => {
  const router = useRouter()
  const currentPath = router.asPath
  const changeLangHandler = async (value: Option | string) => {
    let locale

    if (typeof value === 'object' && 'value' in value) {
      locale = value.value as string
    } else {
      locale = value
    }

    try {
      await router.replace(currentPath, currentPath, { locale })
    } catch (e) {
      console.log(e)
    }
  }
  const isMobile = useIsMobile(480)

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
      className={cn('select-none ', { 'border-none bg-dark-700 ': isMobile })}
      onChange={changeLangHandler}
      options={options!}
      value={options?.find(option => option.value === router.locale) || null}
    />
  )
}
