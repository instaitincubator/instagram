import { JSX } from 'react'

export interface Option {
  imageSrc?: JSX.Element | string
  label?: string
  value: string
}

export interface SelectProps {
  className?: string
  disabled?: boolean
  label?: string
  onChange: (option: Option) => void
  options: Option[]
  value?: Option | null
}
