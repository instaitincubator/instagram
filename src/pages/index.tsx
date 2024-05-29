import { Inter } from 'next/font/google'
import { getLayout } from 'src/app/layouts/mainLayout/Layout'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return <div className="">home</div>
}

Home.getLayout = getLayout
