import {ComponentPropsWithoutRef, CSSProperties, ReactNode} from 'react'

import * as RadixTabs from '@radix-ui/react-tabs'
import {clsx} from 'clsx';


type RootProps = {
  options: Array<{ label: string; value: string; children?: ReactNode; disabled?: boolean; }>
  children?: ReactNode
  padding?: CSSProperties['padding']
  defaultValue?: string
  onValueChange?: (value: string) => void
  value?: string
} & ComponentPropsWithoutRef<'div'>

export const Tabs = ({children, defaultValue, onValueChange, options, value, padding, className}: RootProps) => {

  const classNames = {
    list: clsx('flex', padding),
    trigger: clsx('cursor-pointer w-1/2 py-[6px] px-[24px] text-h3 text-dark-300 text-center bg-transparent border-b-[2px] border-b-dark-300 data-[state=active]:text-accent-500 data-[state=active]:border-b-accent-500 disabled:cursor-not-allowed disabled:text-dark-700 disabled:border-b-dark-700 disabled:data-[state=active]:text-accent-700 disabled:data-[state=active]:border-b-accent-700 enabled:hover:bg-accent-900 enabled:active:bg-accent-800 enabled:focus-visible:bg-gray-700 outline-none transition ease delay-20', className)
  }


  return (
      <RadixTabs.Root defaultValue={defaultValue} onValueChange={onValueChange} value={value}>
        <RadixTabs.List className={classNames.list}>
          {options.map(el => {
            return (
                <RadixTabs.Trigger
                    className={classNames.trigger}
                    disabled={el.disabled}
                    key={el.value}
                    value={el.value}
                >
                  {el.label}
                </RadixTabs.Trigger>
            )
          })}
        </RadixTabs.List>
        {children}
      </RadixTabs.Root>
  )
}

type ContentProps = {
  children: ReactNode
  value: string
}

export const TabsContent = ({children, value}: ContentProps) => {
  return <RadixTabs.Content value={value}>{children}</RadixTabs.Content>
}
