import type { Meta, StoryObj } from '@storybook/react'
import Button from '../Button'
import useToast, { type ShowCb } from './useToast'

const ToastContainer = (args: ShowCb) => {
  const { show } = useToast()

  return (
    <Button
      onPress={() => {
        show(args)
      }}
      variant='callback'
      text='show toast'
    />
  )
}

const ToastMeta: Meta<ShowCb> = {
  title: 'Toast',
  component: ToastContainer,
  args: { description: 'We march for Maccrage', title: 'For the emperor' }
}

export default ToastMeta

type Story = StoryObj<typeof ToastMeta>

export const Default: Story = {}
