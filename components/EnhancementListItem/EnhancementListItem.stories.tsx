import type { Meta, StoryObj } from '@storybook/react'
import EnhancementListItem from './EnhancementListItem'

const EnhancementListItemMeta: Meta<typeof EnhancementListItem> = {
  title: 'EnhancementListItem',
  component: EnhancementListItem,
  args: {
    enhancement: {
      id: 0,
      name: 'Enhancement',
      points: 10
    }
  }
}

export default EnhancementListItemMeta

type Story = StoryObj<typeof EnhancementListItem>

export const Default: Story = {}
