import Select, { Option } from '@/shared/ui/Select/Select'
import { useRouter } from 'next/router'

export const LanguageSelect = () => {
  const router = useRouter()

  const changeLangHandler = (option: Option) => {
    const locale = option.value

    router.push('/', '', { locale })
  }

  const options = router.locales?.map(lg => {
    return { label: lg, value: lg }
  })

  return (
    <Select
      onChange={changeLangHandler}
      options={options!}
      value={{ label: router.locale!, value: router.locale! }}
    />
  )
}
