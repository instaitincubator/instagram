import React from 'react'

type Props = {
  children: React.ReactNode
}
export const Alert = (props: Props) => {
  const { children } = props

  return <div className="fixed bottom-2 right-2 flex flex-col gap-2">{children}</div>
}
