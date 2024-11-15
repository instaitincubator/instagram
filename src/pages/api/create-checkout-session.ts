import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

import config from '../../../config'

const stripe = new Stripe(config.stripeKey!)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Обработка вебхука
    if (req.headers['stripe-signature']) {
      const sig = req.headers['stripe-signature']
      let event

      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          sig,
          'whsec_TXl6mt30KQpyYVXv4ZTfhB90LcnekMT6'
        )
      } catch (err: any) {
        console.error('Ошибка при обработке вебхука:', err)

        return res.status(400).send(`Ошибка: ${err.message}`)
      }
      console.log(event.type)

      switch (event.type) {
        case 'payment_intent.succeeded': {
          const paymentIntentSucceeded = event.data.object

          console.log('Успех:', paymentIntentSucceeded.id)
          break
        }
        case 'payment_intent.payment_failed': {
          const paymentIntentFailed = event.data.object
          const message = paymentIntentFailed.last_payment_error?.message

          console.log('Неудача:', paymentIntentFailed.id, message)
          break
        }
        default:
          console.log(`Необработанное событие: ${event.type}`)
      }

      return res.status(200).send('Вебхук обработан')
    }

    // Обработка создания сессии оплаты
    const { amount, name } = req.body // Сумма в центах

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
