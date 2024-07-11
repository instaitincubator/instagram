import { ComponentProps, useState } from 'react'

import Button from '@/shared/ui/Button/Button'
import { LanguageSelect } from '@/shared/ui/LanguageSelect/LanguageSelect'
import useIsMobile from '@/shared/ui/header/useIsMobile'
import { Menu } from '@/shared/ui/icons/menu'
import { Notification } from '@/shared/ui/icons/notification'
import { clsx } from 'clsx'
import { useRouter } from 'next/router'

import { useTranslation } from '../../../../hooks/useTranslation'

export type HeaderProps = {
  isLoading?: boolean
} & ComponentProps<'header'>

export const Header = ({ className, isLoading, ...rest }: HeaderProps) => {
  const router = useRouter()
  const breakPoint = 768
  const isMobile = useIsMobile(breakPoint)
  const [isAuth, setIsAuth] = useState(false)
  const { t } = useTranslation()

  return (
    <header
      {...rest}
      className={clsx(
        'flex pr-[5%] w-full h-[60px] items-center justify-between bg-dark-700 text-light-100 min-w-[360px] border-b border-b-dark-300',
        className
      )}
    >
      <span className="pl-[5%] cursor-pointer" onClick={() => router.push('/profile')}>
        Instagram
      </span>
      <div className="flex items-center">
        {isMobile && (
          <div className="flex items-center gap-4">
            <LanguageSelect />
            <Menu />
          </div>
        )}
        {!isMobile && (
          <div className="flex gap-[18px] items-center">
            {isAuth && <Notification />}
            <LanguageSelect />
          </div>
        )}
        {!isAuth && !isMobile && (
          <div className="flex items-center w-full pl-6">
            <Button
              className="bg-blue-500 text-white rounded mr-4 w-m[100px]"
              onClick={() => router.push('/sign-in')}
              size="m"
              variant="text"
            >
              {t.header.login}
            </Button>
            <Button
              className="bg-blue-500 text-white rounded"
              onClick={() => router.push('/sign-up')}
              size="m"
            >
              {t.auth.signUp}
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
