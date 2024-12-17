import { JSX } from 'react'

export interface Option {
  imageSrc?: JSX.Element | string
  label?: number | string
  value: number | string
}

interface onChange {
  (option: Option): void
}
// interface onChange {
//   (option: Option): void
//   (value: string): void
// }

export interface SelectProps {
  className?: string
  disabled?: boolean
  label?: string
  onChange: onChange
  options: Option[]
  placeholder?: string
  value?: Option | null
}
