import type { Meta, StoryObj } from '@storybook/react'
import PlayerTag from './PlayerTag'

const PlayerTagMeta: Meta<typeof PlayerTag> = {
  title: 'PlayerTag',
  component: PlayerTag,
  args: {
    player: {
      name: 'doranakan'
    }
  }
}

export default PlayerTagMeta

type Story = StoryObj<typeof PlayerTag>

export const Default: Story = {}