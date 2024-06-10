import { ComponentPropsWithoutRef, ElementRef, ElementType, forwardRef } from 'react'

import clsx from 'clsx'

type Props<T extends ElementType = 'div'> = {
  className?: string
} & ComponentPropsWithoutRef<T>

export const Card = forwardRef<ElementRef<'div'>, Props>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        className={clsx(
          'bg-dark-500 min-w-[100px] min-h-[100px] rounded border-dark-300',
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  }
)
