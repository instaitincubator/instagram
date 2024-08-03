import { Textarea } from '@/shared/ui/Textarea/Textarea'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  args: {
    label: 'Text-area',
    placeholder: 'Text-area',
  },
  component: Textarea,

  tags: ['autodocs'],
  title: 'UI/Textarea',
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Error: Story = {
  args: {
    error: 'true',
  },
}
export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
}
export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
