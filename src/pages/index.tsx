import { getLayout } from '@/app/layouts/mainLayout/Layout'
import Select from '@/shared/ui/Select/Select'
import { useRouter } from 'next/router'

import { english } from '../../locales/english'
import { russian } from '../../locales/russian'

export default function Home() {
  const router = useRouter()

  const t = router.locale === 'english' ? english : russian

  const options = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' },
  ]

  return (
    <div className="flex h-[500px] bg-dark-700 py-[100px] px-[100px] gap-[50px]">
      <div className="text-regular-link">home</div>
      <Select onChange={() => {}} options={options} />
      <h1>{t.test}</h1>
    </div>
  )
}

Home.getLayout = getLayout
