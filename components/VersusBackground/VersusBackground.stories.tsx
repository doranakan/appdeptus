import type { Meta, StoryObj } from '@storybook/react'
import VersusBackground from './VersusBackground'

const VersusBackgroundMeta: Meta<typeof VersusBackground> = {
  title: 'VersusBackground',
  component: VersusBackground,
  args: {
    codexOne: 'Adepta Sororitas'
  }
}

export default VersusBackgroundMeta

type Story = StoryObj<typeof VersusBackground>

export const OnePlayer: Story = {}
export const TwoPlayers: Story = {
  args: {
    codexOne: 'Adepta Sororitas',
    codexTwo: 'Chaos Daemons'
  }
}
