import React, { CSSProperties, JSX, useEffect, useRef, useState } from 'react'

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
  style?: CSSProperties
  value?: Option | null
  withArrow?: boolean
}

const Select: React.FC<SelectProps> = ({
  className,
  disabled = false,
  label,
  onChange,
  options,
  style = {},
  value,
  withArrow = true,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)
  const selectRef = useRef<HTMLDivElement>(null)
  const [focus, setFocus] = useState(false)

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
      setFocus(true)
    }
  }

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setIsOpen(false)
      setFocus(false)
    }
  }

  const renderOptionImage = (option: Option) => {
    if (option.imageSrc && typeof option.imageSrc === 'string') {
      return <Image alt={option.label} height={24} src={option.imageSrc} width={24} />
    }

    return option.imageSrc
  }

  return (
    <div
      className={clsx('relative ', className)}
      onBlur={handleBlur}
      ref={selectRef}
      style={style}
      tabIndex={0}
    >
      {label && <div className="text-regular-14 text-light-900 mb-2">{label}</div>}
      <div
        className={clsx(
          'flex justify-between items-center rounded-sm h-[36px] bg-dark-500 border cursor-pointer',
          {
            'border-accent-500': !isOpen && selectedOption && focus,
            'border-dark-100 ': !isOpen && !selectedOption,
            'border-light-100 rounded-b-none': isOpen,
          }
        )}
        onClick={handleClick}
      >
        <div className="min-w-[95px] text-regular-14 text-light-100 px-[12px] flex items-center">
          {selectedOption && (
            <>
              {renderOptionImage(selectedOption)}
              <span className="ml-2">{selectedOption.label}</span>
            </>
          )}
        </div>
        <div className="pr-[2px]">
          {withArrow && (
            <Image
              alt="arrow"
              className={clsx({ 'transform rotate-180': isOpen })}
              height={24}
              src="/arrow.svg"
              width={24}
            />
          )}
        </div>
      </div>
      {isOpen && (
        <ul
          className="absolute left-0 text-regular-16 text-light-100 bg-dark-500 border border-t-light-100 rounded-b-sm border-light-100 mt-[-1px] z-10"
          style={{ width: selectRef.current?.offsetWidth }}
        >
          {options.map(option => (
            <li
              className="flex p-[8px] px-[12px] hover:bg-dark-300 hover:text-accent-500 cursor-pointer truncate"
              key={option.value}
              onClick={() => handleSelect(option)}
            >
              <div className="flex gap-2">
                {renderOptionImage(option)}
                {option.label}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Select
