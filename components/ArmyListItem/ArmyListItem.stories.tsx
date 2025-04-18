import type { Meta, StoryObj } from '@storybook/react'
import ArmyListItem from './ArmyListItem'

const ArmyListItemMeta: Meta<typeof ArmyListItem> = {
  title: 'ArmyListItem',
  component: ArmyListItem,
  argTypes: {
    codex: {
      type: 'string'
    }
  },
  args: {
    codex: 'Space Marines',
    detachment: 'Detachment',
    name: 'Combat patrol',
    points: 1500
  }
}

export default ArmyListItemMeta

type Story = StoryObj<typeof ArmyListItem>

export const Default: Story = {}
export const Selectabled: Story = {
  args: {
    variant: 'selectable'
  }
}
export const Selected: Story = {
  args: {
    variant: 'selected'
  }
}
export const Shared: Story = {
  args: {
    shareBy: {
      createdAt: '',
      id: '',
      name: 'the warmaster',
      image:
        'https://cdnb.artstation.com/p/assets/images/images/025/662/505/large/johannes-helgeson-horusver02-06.jpg?1586525189'
    }
  }
}
