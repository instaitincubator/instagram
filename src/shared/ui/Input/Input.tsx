import React, { ChangeEvent, ComponentPropsWithoutRef, useEffect, useState } from 'react'

import { Search } from '@/shared/ui/icons/Search'
import { CrossedEye } from '@/shared/ui/icons/crossedEye'
import { Eye } from '@/shared/ui/icons/eye'
import { cn } from '@/shared/utils/cn'

export type Props = {
  checked?: boolean
  className?: string
  disabled?: boolean
  error?: string
  fullWidth?: boolean
  label?: string
  onChangeText?: (value: string) => void
  placeholder?: string
  type?: string
} & ComponentPropsWithoutRef<'input'>

export const Input = (props: Props) => {
  const {
    className,
    disabled,
    error,
    fullWidth,
    label,
    onChange,
    onChangeText,
    placeholder,
    type,
  } = props
  const [showPassword, setShowPassword] = useState(false)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
    onChangeText?.(e.currentTarget.value)
  }

  useEffect(() => {
    if (type === 'password') {
      setShowPassword(true)
    }
  }, [type])

  return (
    <div className={cn(fullWidth ? 'w-full' : 'w-[240px]')}>
      {label && <span className="text-regular-14 text-light-900">{label}</span>}
      <div className="relative flex w-full">
        <input
          className={cn(
            'peer/input text-light-100 disabled:opacity-50 placeholder:select-none active:placeholder:text-light-100 focus:placeholder:text-transparent placeholder:text-regular-16 text-regular-16 focus:border-accent-500 active:border-light-100 w-full h-[36px] placeholder:text-light-900 rounded pl-[10px] border-[2px] bg-transparent hover:bg-dark-700 ',
            {
              'border-danger-500 placeholder:text-light-100': error,
              'border-dark-300 hover:border-dark-100': !error,
              className,
              'pr-[20px], pl-[30px]': type === 'search',
              'pr-[35px]': type === 'password',
            }
          )}
          disabled={disabled}
          onChange={handleChange}
          placeholder={type === 'password' ? '*****************' : placeholder}
          type={showPassword ? 'password' : 'text'}
          value={props.value}
        />
        {type === 'password' &&
          (!showPassword ? (
            <Eye
              className={cn(
                'cursor-pointer absolute top-[6px] h-[24px] w-[24px] right-[9px] fill-light-100',
                disabled && 'fill-light-900'
              )}
              onClick={() => !disabled && setShowPassword(!showPassword)}
            />
          ) : (
            <CrossedEye
              className={cn(
                'cursor-pointer absolute top-[6px] h-[24px] w-[24px] right-[9px] fill-light-100',
                disabled && 'fill-light-900'
              )}
              onClick={() => !disabled && setShowPassword(!showPassword)}
            />
          ))}

        {type === 'search' && (
          <Search
            className={cn(
              'peer-active/input:fill-light-100 peer-focus/input:fill-light-100 cursor-pointer absolute h-[20px] w-[20px] top-[8px] left-[5px] fill-light-900',
              error && 'fill-light-100'
            )}
          />
        )}
      </div>
      {error && <span className="text-regular-14 text-danger-500">{error}</span>}
    </div>
  )
}
