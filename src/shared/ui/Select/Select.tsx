import React, { useEffect, useRef, useState } from 'react'

import clsx from 'clsx'
import Image from 'next/image'

export interface Option {
  label: string
  value: string
}

interface SelectProps {
  className?: string
  disabled?: boolean
  label?: string
  onChange: (option: Option) => void
  options: Option[]
  value?: Option | null
}

const Select: React.FC<SelectProps> = ({
  className,
  disabled = false,
  label,
  onChange,
  options,
  value,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<Option | null>(options[0])
  const [isSelected, setIsSelected] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (value) {
      setSelectedOption(value)
      setIsSelected(true)
    } else if (options.length > 0) {
      setSelectedOption(options[0])
      onChange(options[0])
    }
  }, [value, options, onChange])
  const handleSelect = (option: Option) => {
    setSelectedOption(option)
    onChange(option)
    setIsOpen(false)
    setIsSelected(true)
  }

  const handleClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen)
      setIsSelected(false)
    }
  }

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setIsSelected(false)
      setIsOpen(false)
    }
  }

  return (
    <div className={clsx('relative', className)} onBlur={handleBlur} ref={selectRef} tabIndex={0}>
      {label && <div className="text-regular-14 text-light-900 mb-2">{label}</div>}
      <div
        className={clsx(
          'flex justify-between items-center min-w-[210px] h-[36px] bg-dark-500 border cursor-pointer',
          {
            'border-accent-500 border-[2px]': isSelected && !isOpen,
            'border-light-100': !isSelected || isOpen,
          }
        )}
        onClick={handleClick}
      >
        <div className="text-regular-14 text-light-900 pl-[12px]">
          {selectedOption ? selectedOption.value : ''}
        </div>
        <div className="pr-[2px]">
          <Image
            alt="arrow"
            className={clsx({ 'transform rotate-180': isOpen })}
            height={24}
            src="/arrow.svg"
            width={24}
          />
        </div>
      </div>
      {isOpen && (
        <ul
          className="absolute left-0 min-w-[210px] text-regular-16 text-light-100 bg-dark-500 border border-t-light-100 border-light-100 mt-[-1px] z-10"
          style={{ width: selectRef.current?.offsetWidth }}
        >
          {options.map(option => (
            <li
              className="p-[8px] hover:bg-dark-300 hover:text-accent-500 cursor-pointer truncate"
              key={option.value}
              onClick={() => handleSelect(option)}
            >
              {option.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Select
