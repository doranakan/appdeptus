import type { Meta, StoryObj } from '@storybook/react'
import { noop } from 'lodash'
import { Skull } from 'lucide-react-native'
import OptionButton from './OptionButton'

const OptionButtonMeta: Meta<typeof OptionButton> = {
  title: 'OptionButton',
  component: OptionButton,
  args: {
    disabled: false,
    icon: Skull,
    loading: false,
    onPress: noop,
    text: 'Option button',
    variant: 'callback'
  }
}

export default OptionButtonMeta

type Story = StoryObj<typeof OptionButton>

export const Default: Story = {}
