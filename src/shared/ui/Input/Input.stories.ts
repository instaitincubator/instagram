import type { Meta, StoryObj } from '@storybook/react'

import { Input } from '@/shared/ui/Input/Input'

const meta = {
  args: {
    label: 'label',
    placeholder: 'placeholder',
  },
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Input',
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    type: 'text',
  },
}

export const DefaultPassword: Story = {
  args: {
    type: 'password',
  },
}
export const DefaultSearch: Story = {
  args: {
    type: 'search',
  },
}
export const Error: Story = {
  args: {
    error: 'error message',
  },
}
export const ErrorPassword: Story = {
  args: {
    error: 'error message',
    type: 'password',
  },
}
export const ErrorSearch: Story = {
  args: {
    error: 'error message',
    type: 'search',
  },
}
export const Disabled: Story = {
  args: {
    disabled: true,
    type: 'text',
  },
}
export const DisabledPassword: Story = {
  args: {
    disabled: true,
    type: 'password',
  },
}
export const DisabledSearch: Story = {
  args: {
    disabled: true,
    type: 'search',
  },
}
