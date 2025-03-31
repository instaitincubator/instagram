'use client'

import React, { HTMLAttributes, forwardRef, useCallback, useImperativeHandle, useRef } from 'react'

import { cn } from '@/lib/utils'
import { Variants, motion, useAnimation } from 'motion/react'

export interface MessageCircleMoreIconHandle {
  startAnimation: () => void
  stopAnimation: () => void
}

interface MessageCircleMoreIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number
}

const dotVariants: Variants = {
  animate: (custom: number) => ({
    opacity: [1, 0, 0, 1, 1, 0, 0, 1],
    transition: {
      opacity: {
        duration: 1.5,
        times: [
          0,
          0.1,
          0.1 + custom * 0.1,
          0.1 + custom * 0.1 + 0.1,
          0.5,
          0.6,
          0.6 + custom * 0.1,
          0.6 + custom * 0.1 + 0.1,
        ],
      },
    },
  }),
  normal: {
    opacity: 1,
  },
}

const MessageCircleMoreIcon = forwardRef<MessageCircleMoreIconHandle, MessageCircleMoreIconProps>(
  ({ className, onMouseEnter, onMouseLeave, size = 28, ...props }, ref) => {
    const controls = useAnimation()
    const isControlledRef = useRef(false)

    useImperativeHandle(ref, () => {
      isControlledRef.current = true

      return {
        startAnimation: () => controls.start('animate'),
        stopAnimation: () => controls.start('normal'),
      }
    })

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          void controls.start('animate')
        } else {
          onMouseEnter?.(e)
        }
      },
      [controls, onMouseEnter]
    )

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          void controls.start('normal')
        } else {
          onMouseLeave?.(e)
        }
      },
      [controls, onMouseLeave]
    )

    return (
      <div
        className={cn(
          `cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
          className
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          fill="none"
          height={size}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
          <motion.path animate={controls} custom={0} d="M8 12h.01" variants={dotVariants} />
          <motion.path animate={controls} custom={1} d="M12 12h.01" variants={dotVariants} />
          <motion.path animate={controls} custom={2} d="M16 12h.01" variants={dotVariants} />
        </svg>
      </div>
    )
  }
)

MessageCircleMoreIcon.displayName = 'MessageCircleMoreIcon'

export { MessageCircleMoreIcon }
