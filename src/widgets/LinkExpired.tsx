import { useTranslation } from '@/shared/hooks/useTranslation'
import Button from '@/shared/ui/Button/Button'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  href: string
  title: string
}

export const LinkExpired = ({ href, title }: Props) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center  m-auto gap-5">
      <span className="text-h1 w-[300px] ">{title}</span>
      <span className="text-regular-16 w-[300px] ">{t.auth.verificationMessage}</span>
      <div className="w-[300px] order-4 sm:order-3">
        <Link href={href}>
          <Button fullWidth>{t.auth.verificationButton}</Button>
        </Link>
      </div>
      <Image
        alt="verification-img"
        className="m-auto mt-[30px] order-3 sm:order-4"
        height={352}
        src="/expiredLinkImage.svg"
        width={473}
      />
    </div>
  )
}
