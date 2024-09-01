import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

import type { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'

import { store } from '@/app/store'
import { useLoader } from '@/shared/hooks/useLoader'

import '@/app/globals.css'
import 'nprogress/nprogress.css'

export type NextPageWithLayout<P = {}, IP = P> = {
  getLayout?: (page: ReactElement) => ReactNode
} & NextPage<P, IP>

type AppPropsWithLayout = {
  Component: NextPageWithLayout
} & AppProps

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  useLoader()
  const getLayout = Component.getLayout ?? (page => page)

  return <Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>
}
