import { getLayout } from '@/app/layouts/mainLayout/Layout'
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox'
import Select from '@/shared/ui/Select/Select'

export default function Home() {
  const options = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' },
  ]

  return (
    <div className="flex h-[500px] bg-dark-700 py-[100px] px-[100px] gap-[50px]">
      <div className="text-regular-link">home</div>
      <Select onChange={() => {}} options={options} />
      <Checkbox checked className="pl-[200px]" label="checkbox" />
    </div>
  )
}

Home.getLayout = getLayout
