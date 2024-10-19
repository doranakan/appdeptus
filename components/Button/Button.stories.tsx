import type { Meta, StoryObj } from '@storybook/react'
import { Skull } from 'lucide-react-native'
import Button from './Button'

const ButtonMeta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  args: {
    onPress: () => {},
    variant: 'callback',
    disabled: false
  }
}

export default ButtonMeta
type Story = StoryObj<typeof Button>

export const Icon: Story = {
  args: {
    icon: Skull
  }
}

export const IconText = {
  args: {
    ...Icon.args,
    text: 'For the Emperor!'
  }
}

export const Text = {
  args: {
    text: 'For the Emperor!'
  }
}

export const Small = {
  args: {
    text: 'For the Emperor!',
    size: 'sm'
  }
}
