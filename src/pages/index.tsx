import { getLayout } from '@/app/layouts/mainLayout/Layout'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return <div className="text-regular-link">home</div>
}

Home.getLayout = getLayout
