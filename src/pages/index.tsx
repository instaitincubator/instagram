import { getLayout } from '@/app/layouts/mainLayout/Layout'
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox'

export default function Home() {
  return (
    <div className="h-[200px] bg-dark-700">
      <div className="text-regular-link ">home</div>
      <Checkbox checked className="pl-[200px]" label="checkbox" />
    </div>
  )
}

Home.getLayout = getLayout
