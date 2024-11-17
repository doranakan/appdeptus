import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'
import { Search } from 'lucide-react-native'
import Input from './Input'

const InputMeta: Meta<typeof Input> = {
  title: 'Input',
  component: (props) => (
    <Input
      {...props}
      Icon={Search}
    />
  ),
  args: {
    onChangeText: action('onChangeText')
  }
}

export default InputMeta

type Story = StoryObj<typeof Input>

export const Default: Story = {}
