import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

import type { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'

import { store } from '@/app/store'
import { useLoader } from '@/shared/hooks/useLoader'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import '@/app/globals.css'
import 'nprogress/nprogress.css'

import config from '../../config'

export type NextPageWithLayout<P = {}, IP = P> = {
  getLayout?: (page: ReactElement) => ReactNode
} & NextPage<P, IP>

type AppPropsWithLayout = {
  Component: NextPageWithLayout
} & AppProps

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  useLoader()
  const getLayout = Component.getLayout ?? (page => page)
  const stripePromise = loadStripe(config.stripeKey!)

  return (
    <Provider store={store}>
      <Elements stripe={stripePromise}>{getLayout(<Component {...pageProps} />)}</Elements>
    </Provider>
  )
}
