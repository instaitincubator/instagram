import { ComponentProps } from 'react'

import { LanguageSelect } from '@/features/language-select/LanguageSelect'
import { MobileMenuSelector } from '@/features/mobile-menu-selector/Mobile-menu-selector'
import { useMeQuery } from '@/services/auth/signInApi'
import { useTranslation } from '@/shared/hooks/useTranslation'
import Button from '@/shared/ui/Button/Button'
import { Notification } from '@/shared/ui/icons/notification'
import { cn } from '@/shared/utils/cn'
import { useRouter } from 'next/router'

export type HeaderProps = {
  isLoading?: boolean
} & ComponentProps<'header'>

export const Header = ({ className, isLoading, ...rest }: HeaderProps) => {
  const router = useRouter()
  const { data: me } = useMeQuery()
  const { t } = useTranslation()

  return (
    <header
      {...rest}
      className={cn(
        'flex pr-16 w-full h-[60px] items-center justify-between bg-dark-700 text-light-100 min-w-[360px] border-b border-b-dark-300',
        className
      )}
    >
      <span
        className="pl-[5%] cursor-pointer"
        onClick={() => router.push(`/profile/${me?.userId}`)}
      >
        Instagram
      </span>
      <div className="flex items-center gap-4">
        {me?.userId && (
          <div className="hidden  sm:flex">
            <Notification />
          </div>
        )}
        <LanguageSelect />
        <div className="sm:hidden">
          <MobileMenuSelector />
        </div>
        {!me?.userId && (
          <div className="hidden md:flex items-center gap-4 w-full ">
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
