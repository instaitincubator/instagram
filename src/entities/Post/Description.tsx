import React from 'react'

type Props = {
  description: string
}

export const Description = ({ description }: Props) => {
  return (
    <div>
      <p>{description}</p>
    </div>
  )
}
