import type { Meta, StoryObj } from '@storybook/react'
import UnitName from './UnitName'

const UnitNameMeta: Meta<typeof UnitName> = {
  title: 'UnitName',
  component: UnitName,
  args: {
    name: 'Asurmen',
    warlord: false
  }
}

export default UnitNameMeta

type Story = StoryObj<typeof UnitName>

export const Character: Story = {
  args: {
    type: 'character'
  }
}
export const Leader: Story = {
  args: {
    type: 'leader'
  }
}
export const Squad: Story = {
  args: {
    type: 'squad'
  }
}
export const Transport: Story = {
  args: {
    type: 'transport'
  }
}
export const Vehicle: Story = {
  args: {
    type: 'vehicle'
  }
}
