import { ElementType } from 'react'

export type ButtonVariant = 'outline' | 'primary' | 'secondary' | 'text'
export type ButtonSize = 'l' | 'lx' | 'm' | 'mx' | 's' | 'xl' | 'xxl'
export type InferType<T> = T extends ElementType<infer U> ? U : never
