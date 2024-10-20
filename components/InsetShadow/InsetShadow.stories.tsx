import type { Meta, StoryObj } from '@storybook/react'
import InsetShadow from './InsetShadow'
import { View } from 'react-native'
import Text from '../Text'

const InsetShadowMeta: Meta<typeof InsetShadow> = {
  title: 'InsetShadow',
  args: {
    borderRadius: 16,
    className: 'justify-center items-center'
  },
  component: (props) => (
    <View className='h-24 w-full items-center rounded-2xl bg-primary-700'>
      <InsetShadow {...props}>
        <Text>Some text</Text>
      </InsetShadow>
    </View>
  )
}

export default InsetShadowMeta

type Story = StoryObj<typeof InsetShadow>

export const Default: Story = {}
