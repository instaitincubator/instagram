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
    checked: true,
    label: 'Checkbox',
  },
}

export const NotChecked: Story = {
  args: {
    label: 'Checkbox',
  },
}

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
    label: 'Checkbox',
  },
}

export const NotDisabledChecked: Story = {
  args: {
    disabled: true,
    label: 'Checkbox',
  },
}
