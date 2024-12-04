import React from 'react'

type Props = {
  description: string
}

export const Description = ({ description }: Props) => {
  return (
    <div>
      <p className="break-words">{description}</p>
    </div>
  )
}
