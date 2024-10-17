import type { Meta, StoryObj } from '@storybook/react'
import Text from '../Text'
import { VStack } from '../ui'
import Card from './Card'

const CardMeta: Meta<typeof Card> = {
  title: 'Card',
  component: (props) => (
    <Card {...props}>
      <VStack>
        <VStack className='p-4'>
          <Text className='text-typography-50'>For the Emperor!</Text>
        </VStack>
      </VStack>
    </Card>
  )
}

export default CardMeta

type Story = StoryObj<typeof Card>

export const Default: Story = {}
