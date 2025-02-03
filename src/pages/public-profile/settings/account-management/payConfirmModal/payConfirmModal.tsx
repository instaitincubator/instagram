import React from 'react'

import { useTranslation } from '@/shared/hooks/useTranslation'
import Button from '@/shared/ui/Button/Button'
import { Modal } from '@/shared/ui/Modal/Modal'
import Link from 'next/link'
import { useRouter } from 'next/router'

const PayConfirmModal = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const payConfirmation = router.query.success === 'true' ? 'Success' : 'Error'

  return (
    router.query.success && (
      <Modal
        onClose={() => router.push('/profile/settings/account-management')}
        title={payConfirmation}
      >
        <div className="pb-[50px] w-[300px]">
          {router.query.success === 'true' ? t.payment.paySuccess : t.payment.payFailed}
        </div>
        <Link className="w-full" href={'/profile/settings/account-management'}>
          <Button fullWidth onClick={() => router.push('/profile/settings/account-management')}>
            {router.query.success ? <div>OK</div> : <div>{t.payment.backToPayment}</div>}
          </Button>
        </Link>
      </Modal>
    )
  )
}

export default PayConfirmModal
