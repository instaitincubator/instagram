import React from 'react'
type Props = {
  className: string
  height: string
  width: string
}
export const CloseIcon = (props: Props) => {
  const { className, height, width } = props

  return (
    <svg
      className={className}
      fill="none"
      height={height}
      viewBox="0 0 24 24"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
        fill="currentColor"
      />
    </svg>
  )
}
