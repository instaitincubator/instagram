import React from 'react'

import { cn } from '@/shared/utils/cn'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface LinkProps {
  activeLink: string
  addPostModal?: () => void
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
  addPostModal,
  child1,
  child2,
  children,
  className,
  href,
  setActiveLink,
  title,
}: LinkProps) => {
  const isActive = href?.split('/')[1] === activeLink.split('/')[1]
  const router = useRouter()
  const handleClick = () => {
    if (!href) {
      if (addPostModal) {
        addPostModal()
      }
    } else {
      setActiveLink(href)
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
      onClick={handleClick}
    >
      {isActive && child2 ? child2 : child1 || null}
      {title && <span className="hidden sm:flex text-medium-14">{title}</span>}
      {children && children}
    </Link>
  )
}

export default CustomLink
