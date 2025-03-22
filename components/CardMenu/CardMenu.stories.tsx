import type { Meta, StoryObj } from '@storybook/react'
import Text from '../Text'
import { HStack } from '../ui'
import CardMenu from './CardMenu'

const CardMenuMeta: Meta<typeof CardMenu> = {
  title: 'CardMenu',
  component: CardMenu,
  args: {
    items: [
      {
        href: '',
        title: 'Navigation link',
        variant: 'internal',
        notifications: 0
      },
      {
        href: 'https://appdeptus.com',
        title: 'External link',
        variant: 'external',
        notifications: 0
      }
    ]
  }
}

export default CardMenuMeta

type Story = StoryObj<typeof CardMenuMeta>

const Header = (
  <HStack
    className='p-4'
    space='md'
  >
    <Text
      className='uppercase'
      family='body-bold'
    >
      TITLE
    </Text>
    <Text family='body-regular-italic'>Description</Text>
  </HStack>
)

export const Default: Story = {}
export const ShowHeader: Story = {
  decorators: [
    (Story, { args }) => (
      <Story
        args={{
          ...args,
          Header
        }}
      />
    )
  ]
}
