import { PropsWithChildren, ReactElement } from 'react'

import { NextPage } from 'next'
import Link from 'next/link'

export const Layout: NextPage<PropsWithChildren> = props => {
  const { children } = props

  return (
    <div>
      <div className="flex gap-4 justify-center w-full bg-amber-400">
        <Link href={'/'}>home</Link>
        <Link href={'/login'}>login</Link>
        <Link href={'/forgot-password'}>forgot-password</Link>
        <Link href={'/public'}>public</Link>
        <Link href={'/profile'}>profile</Link>
        <Link href={'/settings'}>settings</Link>
        <Link href={'/statistics'}>statistics</Link>
      </div>
      <div>{children}</div>
    </div>
  )
}

export const getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}
