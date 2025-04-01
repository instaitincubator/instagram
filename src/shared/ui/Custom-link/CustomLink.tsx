import React from 'react'

import { useTranslation } from '@/shared/hooks/useTranslation'
import { cn } from '@/shared/utils/cn'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface LinkProps {
  activeLink: string
  alt: string
  child1: React.ReactElement
  child2?: React.ReactElement
  children?: React.ReactElement
  className?: string
  href?: string
  setActiveLink: (href: string) => void
  title?: string
}

const CustomLink = ({
  activeLink,
  child1,
  child2,
  children,
  className,
  href,
  setActiveLink,
  title,
}: LinkProps) => {
  const isActive = href?.split('/')[1] === activeLink?.split('/')[1]
  const router = useRouter()
  const { t } = useTranslation()
  const handleLinkClick = (e: React.MouseEvent) => {
    if (title === t.sidebar.create) {
      e.preventDefault()
      if (router.pathname.split('/')[1] === 'public-profile') {
        void router.push({
          query: {
            createPost: 'true',
            id: router.query.id,
          },
        })
      } else {
        void router.push({
          query: {
            createPost: 'true',
          },
        })
      }
    } else {
      setActiveLink(href!)
    }
  }

  return (
    <Link
      className={cn(
        'flex border-2 border-transparent items-center gap-4 hover:text-accent-100 rounded active:text-accent-700',
        isActive ? 'text-accent-700' : '',
        className
      )}
      href={href ? href : router.asPath}
      onClick={handleLinkClick}
    >
      {isActive && child2 ? child2 : child1 || null}
      {title && <span className="hidden sm:flex text-medium-14">{title}</span>}
      {children && children}
    </Link>
  )
}

export default CustomLink
