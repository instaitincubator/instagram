import React from 'react'

import { useTranslation } from '@/shared/hooks/useTranslation'
import Button from '@/shared/ui/Button/Button'

type Props = {
  onClose: () => void
  onSubmit: () => void
}
const PostEditMenu = ({ onClose, onSubmit }: Props) => {
  const { t } = useTranslation()

  return (
    <div className="flex items-center sm:hidden sm:invisible justify-between py-[18px]">
      <Button className="text-h3" onClick={onClose} variant="text">
        {t.postModal.cancel}
      </Button>
      <h2 className="text-h2">{t.postModal.editPost}</h2>
      <Button className="text-h3 text-accent-500" onClick={onSubmit} variant="text">
        {t.postModal.save}
      </Button>
    </div>
  )
}

export default PostEditMenu
