import React from 'react'

import { clsx } from 'clsx'
import Link from 'next/link'

interface LinkProps {
  activeLink: string
  alt: string
  child1: React.ReactElement
  child2?: React.ReactElement
  children?: React.ReactElement
  className?: string
  href: string
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
  const isActive = href === activeLink
  const handleClick = () => {
    setActiveLink(href)
  }

  return (
    <Link
      className={clsx(
        'flex border-2 border-transparent items-center gap-4 hover:text-accent-100 rounded active:text-accent-700',
        isActive ? 'text-accent-700' : '',
        className
      )}
      href={href}
      onClick={handleClick}
    >
      {isActive && child2 ? child2 : child1 || null}
      {title && <span className="hidden sm:flex text-medium-14">{title}</span>}
      {children && children}
    </Link>
  )
}

export default CustomLink
