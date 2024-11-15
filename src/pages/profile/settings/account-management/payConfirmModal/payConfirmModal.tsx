import React, { useEffect, useState } from 'react'

import { useTranslation } from '@/shared/hooks/useTranslation'
import Button from '@/shared/ui/Button/Button'
import { Modal } from '@/shared/ui/Modal/Modal'
import Link from 'next/link'

interface Props {
  slug: string | string[]
}

const PayConfirmModal = ({ slug }: Props) => {
  const [payConfirmation, setPayConfirmation] = useState('')
  const { t } = useTranslation()

  useEffect(() => {
    if (slug !== undefined) {
      if (slug[0] === 'success') {
        setPayConfirmation('Success')
      } else if (slug[0] === 'error') {
        setPayConfirmation('Error')
      }
    }
  }, [slug])

  return (
    payConfirmation && (
      <Modal onClose={() => setPayConfirmation('')} title={payConfirmation}>
        <div className="pb-[50px] w-[300px]">
          {payConfirmation === 'success' ? t.payment.payFailed : t.payment.paySuccess}
        </div>
        <Link className="w-full" href={'/profile/settings/account-management'}>
          <Button fullWidth onClick={() => setPayConfirmation('')}>
            {payConfirmation === 'success' ? <div>{t.payment.backToPayment}</div> : <div>OK</div>}
          </Button>
        </Link>
      </Modal>
    )
  )
}

export default PayConfirmModal
