import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

import config from '../../../config'

const stripe = new Stripe(config.stripeKey!)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { amount, name } = req.body

    try {
      const session = await stripe.checkout.sessions.create({
        cancel_url: `${req.headers.origin}/profile/settings/account-management/error`,
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: name,
              },
              unit_amount: amount,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        payment_method_types: ['card'],
        success_url: `${req.headers.origin}/profile/settings/account-management/success`,
      })

      return res.status(200).json({ id: session.id })
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Метод ${req.method} не разрешен`)
  }
}
