import React, { useEffect, useRef, useState } from 'react'

import { Option, SelectProps } from '@/shared/ui/Select/types'
import { cn } from '@/shared/utils/cn'
import Image from 'next/image'

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
      return <Image alt={option.label!} height={24} src={option.imageSrc} width={24} />
    }

    return option.imageSrc
  }
  const mappedOptions = options.map((option, index) => (
    <li
      className="flex p-[8px] px-[12px] hover:bg-dark-300 hover:text-accent-500 cursor-pointer truncate"
      key={index}
      onClick={() => handleSelect(option)}
    >
      <div className="flex gap-2">
        {renderOptionImage(option)}
        {option.label}
      </div>
    </li>
  ))

  return (
    <div className="relative  flex-grow min-w-fit" onBlur={handleBlur} ref={selectRef} tabIndex={0}>
      {label && <div className="text-regular-14 text-light-900 mb-2">{label}</div>}
      <div
        className={cn(
          'flex justify-between items-center rounded-sm h-[36px] bg-dark-500 border cursor-pointer',
          {
            'border-accent-500': !isOpen && selectedOption && focus,
            'border-dark-100 ': !isOpen && !selectedOption,
            'border-light-100 rounded-b-none': isOpen,
          },
          className
        )}
        onClick={handleClick}
      >
        <div className="text-regular-14 text-light-100 px-[12px] flex items-center">
          {selectedOption && (
            <>
              {renderOptionImage(selectedOption)}
              {selectedOption.label && <span className="ml-2">{selectedOption.label}</span>}
            </>
          )}
        </div>
        <div className="pr-[2px]">
          <Image
            alt="arrow"
            className={cn({ 'transform rotate-180': isOpen })}
            height={24}
            src="/arrow.svg"
            width={24}
          />
        </div>
      </div>
      {isOpen && (
        <ul
          className={cn(
            'absolute max-h-[200px] overflow-y-auto left-0 text-regular-16 text-light-100 bg-dark-500 border border-t-light-100 rounded-b-sm border-light-100 mt-[-1px] z-10',
            className
          )}
          style={{ width: selectRef.current?.offsetWidth }}
        >
          {mappedOptions}
        </ul>
      )}
    </div>
  )
}

export default Select
