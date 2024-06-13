import React, { JSX, useEffect, useRef, useState } from 'react'

import clsx from 'clsx'
import Image from 'next/image'

export interface Option {
  imageSrc?: JSX.Element | string
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
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)
  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (value) {
      setSelectedOption(value)
    } else if (options.length > 0) {
      setSelectedOption(options[0])
      onChange(options[0])
    }
  }, [value, options, onChange])

  const handleSelect = (option: Option) => {
    setSelectedOption(option)
    onChange(option)
    setIsOpen(false)
  }

  const handleClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen)
    }
  }

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setIsOpen(false)
    }
  }

  const renderOptionImage = (option: Option) => {
    if (option.imageSrc && typeof option.imageSrc === 'string') {
      return (
        <Image alt={option.label} className="mr-2" height={24} src={option.imageSrc} width={24} />
      )
    }

    return option.imageSrc
  }

  return (
    <div
      className={clsx('relative min-w-[100px]', className)}
      onBlur={handleBlur}
      ref={selectRef}
      tabIndex={0}
    >
      {label && <div className="text-regular-14 text-light-900 mb-2">{label}</div>}
      <div
        className={clsx(
          'flex justify-between items-center h-[36px] bg-dark-500 border cursor-pointer',
          {
            'border-accent-500': !isOpen && selectedOption,
            'border-dark-100': !isOpen && !selectedOption,
            'border-light-100': isOpen,
          }
        )}
        onClick={handleClick}
      >
        <div className="text-regular-14 text-light-100 px-[12px] flex items-center">
          {selectedOption && (
            <>
              {renderOptionImage(selectedOption)}
              <span className="ml-2">{selectedOption.label}</span>
            </>
          )}
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
          className="absolute left-0 text-regular-16 text-light-100 bg-dark-500 border border-t-light-100 border-light-100 mt-[-1px] z-10"
          style={{ width: selectRef.current?.offsetWidth }}
        >
          {options.map(option => (
            <li
              className="flex p-[8px] hover:bg-dark-300 hover:text-accent-500 cursor-pointer truncate"
              key={option.value}
              onClick={() => handleSelect(option)}
            >
              {renderOptionImage(option)}
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Select
