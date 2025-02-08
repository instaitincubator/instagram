import {
  ComponentPropsWithoutRef,
  ElementRef,
  ElementType,
  ForwardedRef,
  ReactElement,
  forwardRef,
} from 'react'

import { BTNSIZES, VATIANCLASSES } from '@/shared/ui/Button/consts'
import { ButtonSize, ButtonVariant, InferType } from '@/shared/ui/Button/types'
import { cn } from '@/shared/utils/cn'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  disabled?: boolean
  fullWidth?: boolean
  size?: ButtonSize
  variant?: ButtonVariant
} & ComponentPropsWithoutRef<T>

const Button = forwardRef(
  <T extends ElementType = 'button'>(props: ButtonProps<T>, ref: ForwardedRef<InferType<T>>) => {
    const {
      as: Component = 'button',
      children,
      className,
      fullWidth = false,
      size,
      variant = 'primary',
      ...rest
    } = props

    const classNames = cn(
      'flex justify-center items-center relative no-underline cursor-pointer box-border rounded-[2px] py-[6px] px-[24px] text-h3 text-nowrap text-center',
      VATIANCLASSES[variant],
      className,
      fullWidth && 'w-full',
      BTNSIZES[size ?? 'm']
    )

    return (
      <Component className={classNames} ref={ref} {...rest}>
        {children}
      </Component>
    )
  }
)

export default Button as <T extends ElementType = 'button'>(
  props: {
    ref?: ForwardedRef<ElementRef<T>>
  } & ButtonProps<T>
) => ReactElement
