import type { Meta } from '@storybook/react'

import { ComponentProps, useState } from 'react'

import { Tabs, TabsContent } from './Tabs'

const meta = {
  component: Tabs,
  tags: ['autodocs'],
  title: 'UI/Tabs',
} satisfies Meta<typeof Tabs>

export default meta

const defaultOptions = [
  { label: 'General Information', value: 'general' },
  { label: 'Devices', value: 'devices' },
  { label: 'Account Management', value: 'management' },
  { label: 'My Payments', value: 'payments' },
]

const disabledOptions = [
  { disabled: true, label: 'General Information', value: 'general' },
  { disabled: false, label: 'Devices', value: 'devices' },
  { disabled: true, label: 'Account Management', value: 'management' },
  { disabled: false, label: 'My Payments', value: 'payments' },
]

const TabsWithHook = (props: Omit<ComponentProps<typeof Tabs>, 'onValueChange' | 'value'>) => {
  const [value, setValue] = useState<string>(defaultOptions[0].value)

  return <Tabs {...props} onValueChange={setValue} value={value} />
}

export const Default = {
  render: () => <TabsWithHook options={defaultOptions} />,
}

export const WithDisabled = {
  render: () => <TabsWithHook options={disabledOptions} />,
}

export const WithContent = {
  render: () => (
    <TabsWithHook options={defaultOptions}>
      <TabsContent value={defaultOptions[0].value}>
        <h3>{defaultOptions[0].label}</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Augue ut lectus arcu bibendum at. Mauris a diam maecenas
          sed enim.
        </p>
      </TabsContent>
      <TabsContent value={defaultOptions[1].value}>
        <h3>{defaultOptions[1].label}</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Augue ut lectus arcu bibendum at. Mauris a diam maecenas
          sed enim.
        </p>
      </TabsContent>
      <TabsContent value={defaultOptions[2].value}>
        <h3>{defaultOptions[2].label}</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Augue ut lectus arcu bibendum at. Mauris a diam maecenas
          sed enim.
        </p>
      </TabsContent>
      <TabsContent value={defaultOptions[3].value}>
        <h3>{defaultOptions[3].label}</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Augue ut lectus arcu bibendum at. Mauris a diam maecenas
          sed enim.
        </p>
      </TabsContent>
    </TabsWithHook>
  ),
}
