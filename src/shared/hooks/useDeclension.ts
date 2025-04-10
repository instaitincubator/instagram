import { useEffect, useState } from 'react'

import { useTranslation } from '@/shared/hooks/useTranslation'

export const useDeclension = (
  numb: number | undefined,
  endings: string[],
  caseDeclensions = [2, 0, 1, 1, 1, 2]
) => {
  const [ending, setEnding] = useState('')
  const { locale, t } = useTranslation()
  const sklonenie = (number: number | undefined, txt: string[], cases = caseDeclensions) =>
    number
      ? txt[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]]
      : txt[2]

  useEffect(() => {
    if (locale === 'en-EN') {
      setEnding(numb === undefined || numb > 1 ? 's' : '')
    } else {
      setEnding(sklonenie(numb, endings))
    }
  }, [numb])

  return ending
}
