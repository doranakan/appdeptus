import type { Meta, StoryObj } from '@storybook/react'
import ArmyBackground from './ArmyBackground'

const ArmyBackgroundMeta: Meta<typeof ArmyBackground> = {
  title: 'ArmyBackground',
  component: ArmyBackground,
  argTypes: {
    codex: {
      type: 'string'
    }
  },
  args: {
    codex: 'Space Marines'
  }
}

export default ArmyBackgroundMeta

type Story = StoryObj<typeof ArmyBackground>

export const Default: Story = {}
