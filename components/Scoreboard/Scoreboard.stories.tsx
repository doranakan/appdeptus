import type { Meta, StoryObj } from '@storybook/react'
import { type Army } from 'appdeptus/models'
import Scoreboard from './Scoreboard'

const ScoreboardMeta: Meta<typeof Scoreboard> = {
  title: 'Scoreboard',
  args: {
    playerOne: {
      army: {
        codex: {
          id: 'id',
          name: 'Adepta Sororitas'
        },
        id: 'id',
        name: 'Army One',
        points: 2000,
        composition: {} as unknown as Army['composition']
      },
      cp: 12,
      name: 'doranakan',
      score: 23
    },
    playerTwo: {
      army: {
        codex: {
          id: 'id',
          name: 'Adeptus Mechanicus'
        },
        id: 'id',
        name: 'Army Two',
        points: 1990,
        composition: {} as unknown as Army['composition']
      },
      cp: 12,
      name: 'ildenso',
      score: 12
    }
  },
  component: Scoreboard
}

export default ScoreboardMeta

type Story = StoryObj<typeof Scoreboard>

export const Default: Story = {}
