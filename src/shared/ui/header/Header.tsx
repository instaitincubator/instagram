import { ComponentProps, useState } from 'react'

import Button from '@/shared/ui/Button/Button'
import { LanguageSelect } from '@/shared/ui/LanguageSelect/LanguageSelect'
import useIsMobile from '@/shared/ui/header/useIsMobile'
import { Menu } from '@/shared/ui/icons/menu'
import { Notification } from '@/shared/ui/icons/notification'
import { clsx } from 'clsx'

export type HeaderProps = {
  isLoading?: boolean
} & ComponentProps<'header'>

export const Header = ({ className, isLoading, ...rest }: HeaderProps) => {
  const breakPoint = 768
  const isMobile = useIsMobile(breakPoint)
  const [isAuth, setIsAuth] = useState(true)

  return (
    <header
      {...rest}
      className={clsx(
        'flex pr-[5%] w-full h-[60px] justify-between bg-dark-700 text-light-100 items-center min-w-[360px] border-b border-b-dark-300',
        className
      )}
    >
      <span className="pl-[5%]">Instagram</span>
      {isMobile && (
        <div className="flex">
          <LanguageSelect />
          <Menu />
        </div>
      )}
      {!isMobile && (
        <div className="flex gap-[18px]">
          <Notification />
          <LanguageSelect />
        </div>
      )}
      {!isAuth && (
        <div className="flex">
          <Button className="bg-blue-500 text-white rounded mr-4" size="m" variant="text">
            Log in
          </Button>
          <Button className="bg-blue-500 text-white rounded" size="m">
            Sign up
          </Button>
        </div>
      )}
    </header>
  )
}
