import { getLayout } from '@/app/layouts/mainLayout/Layout'
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="h-[200px] ">
      <div className="text-regular-link ">home</div>
      <Checkbox checked className="pl-[400px]" label="checkbox" />
    </div>
  )
}

Home.getLayout = getLayout
