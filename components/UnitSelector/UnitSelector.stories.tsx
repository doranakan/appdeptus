import type { Meta, StoryObj } from '@storybook/react'
import UnitSelector from './UnitSelector'

const UnitSelectorMeta: Meta<typeof UnitSelector> = {
  title: 'UnitSelector',
  component: UnitSelector,
  args: {
    count: 0,
    unit: {
      id: 'id',
      name: 'Asurmen',
      tiers: [
        {
          id: 'id',
          models: 1,
          points: 135
        }
      ],
      type: 'leader',
      upgrades: []
    }
  }
}

export default UnitSelectorMeta

type Story = StoryObj<typeof UnitSelector>

export const Default: Story = {}
export const Selected: Story = {
  args: {
    count: 1
  }
}
