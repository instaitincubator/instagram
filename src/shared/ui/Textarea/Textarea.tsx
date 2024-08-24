import { ChangeEvent, ComponentPropsWithoutRef } from 'react'

import { cn } from '@/shared/utils/cn'

type Props = {
  className?: string
  disabled?: boolean
  error?: string
  fullWidth?: boolean
  label?: string
  onChange?: (value: string) => void
  placeholder?: string
  value?: string
} & ComponentPropsWithoutRef<'textarea'>

export const Textarea = ({
  children,
  className,
  disabled,
  error,
  fullWidth,
  label,
  onChange,
  placeholder,
  value,
  ...restProps
}: Props) => {
  const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e.currentTarget.value)
    }
  }

  return (
    <div className="flex flex-col">
      <label
        className={cn('text-regular-14 text-light-900', {
          'text-dark-100': disabled,
        })}
      >
        {label}
      </label>
      <textarea
        {...restProps}
        className={cn(
          'disabled:placeholder:text-dark-100 focus:text-light-100 focus:placeholder:text-light-100  focus:border-accent-700 active:text-light-100 active:border-light-100 bg-dark-500 text-regular-16 border resize-none rounded-sm px-3 py-[6px] h-[85px] w-[280px]',
          {
            'border-danger-500': error,
            'border-dark-100 text-light-900': !error && !disabled,
            className,
            'w-full': fullWidth,
          }
        )}
        disabled={disabled}
        onChange={e => onChangeText(e)}
        placeholder={placeholder}
        value={value}
      />
      {error && <span className="text-regular-14 text-danger-500">{error}</span>}
    </div>
  )
}
