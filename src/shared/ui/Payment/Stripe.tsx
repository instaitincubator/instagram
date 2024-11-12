import React, { useState } from 'react'

import { loadStripe } from '@stripe/stripe-js'
import Image from 'next/image'

import config from '../../../../config'

const stripePromise = loadStripe(config.stripeTestKey!)

export const StripeButton: React.FC = () => {
  const [amount] = useState<number>(1000) // 10$ в центах
  const [error, setError] = useState<null | string>(null)

  const handleCheckout = async () => {
    const stripe = await stripePromise

    const response = await fetch('/api/create-checkout-session', {
      body: JSON.stringify({ amount }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const session = await response.json()

    if (response.ok) {
      const { error } = await stripe!.redirectToCheckout({ sessionId: session.id })

      if (error) {
        setError(error.message!)
      }
    } else {
      setError(session.error)
    }
  }

  return (
    <div>
      <button onClick={handleCheckout} type="button">
        <Image
          alt="stripe"
          className="hover:border hover:rounded-lg hover:border-dark-100 cursor-pointer"
          height={64}
          src="/stripeLogo.svg"
          width={96}
        />
      </button>
      {error && <div>{error}</div>}
    </div>
  )
}
