import { getLayout } from '@/app/layouts/mainLayout/Layout'
import { Input } from '@/shared/ui/Input/Input'

export default function Home() {
  const options = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' },
  ]

  return (
    <div className="flex py-[100px] px-[100px] gap-[50px] ">
      <Input error="asdasda" placeholder="text must be here" type="search" />
    </div>
  )
}

Home.getLayout = getLayout
