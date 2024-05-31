import { Inter } from 'next/font/google'
import { getLayout } from 'src/app/layouts/mainLayout/Layout'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return <div className="text-regular-link">home</div>
}

Home.getLayout = getLayout
