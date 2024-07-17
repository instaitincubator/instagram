import { ComponentProps } from 'react'

import { useAppSelector } from '@/app/store'
import { LanguageSelect } from '@/features/language-select/LanguageSelect'
import { MobileMenuSelector } from '@/features/mobile-menu-selector/Mobile-menu-selector'
import Button from '@/shared/ui/Button/Button'
import { Menu } from '@/shared/ui/icons/menu'
import { Notification } from '@/shared/ui/icons/notification'
import { clsx } from 'clsx'
import { useRouter } from 'next/router'

import { useTranslation } from '../../../hooks/useTranslation'

export type HeaderProps = {
  isError?: boolean
  isLoading?: boolean
} & ComponentProps<'header'>

export const Header = ({ className, isError, isLoading, ...rest }: HeaderProps) => {
  const router = useRouter()
  const isAuth = useAppSelector(state => state.auth.isAuth)
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
      <div className="flex items-center gap-4">
        {isAuth && (
          <div className="hidden  md:flex">
            <Notification />
          </div>
        )}
        <LanguageSelect />
        <div className="md:hidden">
          <MobileMenuSelector />
        </div>
        {!isAuth && isError && (
          <div className="hidden md:flex items-center w-full ">
            <Button onClick={() => router.push('/sign-in')} size="m" variant="text">
              {t.header.login}
            </Button>
            <Button onClick={() => router.push('/sign-up')} size="m">
              {t.auth.signUp}
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
