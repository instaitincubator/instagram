import { PropsWithChildren, ReactElement } from 'react'

import { Header } from '@/shared/ui/header/Header'
import { NextPage } from 'next'
import Link from 'next/link'

export const Layout: NextPage<PropsWithChildren> = props => {
  const { children } = props

  return (
    <div className="flex flex-col min-h-screen justify-between flex-wrap text-light-100 bg-dark-700 min-w-[360]">
      <Header />
      <div className="py-[17px]">{children}</div>
      <div className="flex gap-4 justify-center h-[60px] flex-wrap">
        <Link href={'/'}>home</Link>
        <Link href={'/login'}>login</Link>
        <Link href={'/sign-in'}>signIn</Link>
        <Link href={'/sign-up'}>signUp</Link>
        <Link href={'/forgot-password'}>forgot-password</Link>
        <Link href={'/public'}>public</Link>
        <Link href={'/profile'}>profile</Link>
        <Link href={'/settings'}>settings</Link>
        <Link href={'/statistics'}>statistics</Link>
        <Link href={'/github'}>gitHub</Link>
      </div>
    </div>
  )
}

export const getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}
