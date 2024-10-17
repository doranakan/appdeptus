import type { Meta, StoryObj } from '@storybook/react'
import ArmyListItem from './ArmyListItem'

const CardMeta: Meta<typeof ArmyListItem> = {
  title: 'ArmyListItem',
  component: ArmyListItem,
  argTypes: {
    codex: {
      type: 'string'
    }
  },
  args: {
    codex: 'Space Wolves',
    name: 'Combat patrol',
    points: 1500
  }
}

export default CardMeta

type Story = StoryObj<typeof ArmyListItem>

export const Default: Story = {}
