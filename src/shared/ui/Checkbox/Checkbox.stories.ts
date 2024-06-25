import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from '@/shared/ui/Checkbox/Checkbox'
import { fn } from '@storybook/test'

const meta = {
  args: { onClick: fn() },
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Checkbox',
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Checked: Story = {
  args: {
    label: 'Checkbox',
    value: true,
  },
}

export const NotChecked: Story = {
  args: {
    label: 'Checkbox',
  },
}

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    label: 'Checkbox',
    value: true,
  },
}

export const NotDisabledChecked: Story = {
  args: {
    disabled: true,
    label: 'Checkbox',
  },
}
