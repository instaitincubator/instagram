import { Inter } from 'next/font/google'
import { getLayout } from 'src/app/layouts/mainLayout/Layout'
import Button from 'src/shared/ui/Button'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col gap-4 bg-accent-100 p-6">
        <Button size="xxl" type="button" variant="primary">
          primary
        </Button>
        <Button type="button" variant="secondary">
          secondary
        </Button>
        <Button size="m" type="button" variant="outline">
          outline
        </Button>
        <Button size="xl" type="button" variant="text">
          text
        </Button>
      </div>
    </div>
  )
}

Home.getLayout = getLayout
