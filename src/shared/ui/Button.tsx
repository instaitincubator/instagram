import {
  ComponentPropsWithoutRef,
  ElementRef,
  ElementType,
  ForwardedRef,
  ReactElement,
  forwardRef,
} from 'react'

import clsx from 'clsx'

import styles from './styles.module.css'

export type ButtonVariant = 'outline' | 'primary' | 'secondary' | 'text'
export type ButtonSize = 'l' | 'm' | 's' | 'xl' | 'xxl'

type InferType<T> = T extends ElementType<infer U> ? U : never

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
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
      size = 'l',
      variant = 'primary',
      ...rest
    } = props

    const variantClasses = {
      outline: styles['btn-outline'],
      primary: styles['btn-primary'],
      secondary: styles['btn-secondary'],
      text: styles['btn-text'],
    }
    const btnSizes = {
      l: styles['btn-l'],
      m: styles['btn-m'],
      s: styles['btn-s'],
      xl: styles['btn-xl'],
      xxl: styles['btn-xxl'],
    }
    const classNames = clsx(
      styles.btn,
      variantClasses[variant],
      btnSizes[size],
      fullWidth && styles['btn-full-width'],
      className,
      Component === 'a' && 'no-underline'
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
