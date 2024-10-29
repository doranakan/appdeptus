import type { Meta, StoryObj } from '@storybook/react'
import GameBackground from './GameBackground'

const GameBackgroundMeta: Meta<typeof GameBackground> = {
  title: 'GameBackground',
  args: {
    codexOne: 'Aeldari',
    codexTwo: 'World Eaters'
  },
  component: GameBackground
}

export default GameBackgroundMeta

type Story = StoryObj<typeof GameBackground>

export const Default: Story = {}
