import React from 'react'

import { useTranslation } from '@/shared/hooks/useTranslation'
import Button from '@/shared/ui/Button/Button'
import { Modal } from '@/shared/ui/Modal/Modal'

type PropsType = {
  confirm: () => void
  email: string
  onClose: () => void
}
const LogOutModal = ({ confirm, email, onClose }: PropsType) => {
  const { t } = useTranslation()

  return (
    <Modal onClose={onClose} title={t.auth.logOut}>
      <div>
        <h2 className={'w-[300px] text-regular-16 pt-3.5 pb-[58px] leading-6 md:w-[390px]'}>
          {t.auth.wantLogOut} <span className="text-bold-16">"{email}"</span>?
        </h2>
        <div className="flex gap-6 mb-5 justify-center md:justify-end">
          <Button onClick={confirm} variant={'outline'}>
            {t.generalInformation.yes}
          </Button>
          <Button onClick={onClose}>{t.auth.no}</Button>
        </div>
      </div>
    </Modal>
  )
}

export default LogOutModal
