import React, { ReactNode } from 'react'

import Link from 'next/link'

interface LinkProps {
  alt: string
  children: React.ReactNode
  className?: string
  href: string
  title: string
}

const CustomLink = ({ alt, children, className, href, title }: LinkProps) => {
  return (
    <Link
      className="flex border-2 border-transparent items-center gap-4 hover:text-accent-100 focus:border-2 focus:border-accent-700 rounded active:text-accent-700"
      href={href}
    >
      {children}
      {title}
    </Link>
  )
}

export default CustomLink
