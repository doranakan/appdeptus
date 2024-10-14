import type { Meta, StoryObj } from '@storybook/react'
import { StoryContainer } from '../storybook'
import Text from '../Text'
import { VStack } from '../ui'
import Card from './Card'

const CardMeta: Meta<typeof Card> = {
  title: 'Card',
  component: Card,
  decorators: (Story) => (
    <StoryContainer>
      <Story>
        <VStack>
          <VStack className='p-4'>
            <Text>For the Emperor!</Text>
          </VStack>
        </VStack>
      </Story>
    </StoryContainer>
  )
}

export default CardMeta

export const Default: StoryObj<typeof Card> = {}
