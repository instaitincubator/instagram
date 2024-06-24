import Button from '@/shared/ui/Button/Button'
import { Modal, ModalProps } from '@/shared/ui/Modal/Modal'
import { Meta, StoryFn } from '@storybook/react'

const meta: Meta = {
  argTypes: {
    onClose: { action: 'closed' },
  },
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Modal',
}

export default meta

const Template: StoryFn<ModalProps> = args => (
  <Modal {...args}>
    <>
      <div>We have sent a link to confirm your email to epam@epam.com</div>
      <Button onClick={() => alert('Modal closed')}>OK</Button>
    </>
  </Modal>
)

export const Default = Template.bind({})
Default.args = {
  onClose: () => alert('Modal closed'),
  title: 'Modal with Content',
}
