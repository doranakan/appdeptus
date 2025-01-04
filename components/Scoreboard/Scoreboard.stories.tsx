import type { Meta, StoryObj } from '@storybook/react'
import Scoreboard from './Scoreboard'

const ScoreboardMeta: Meta<typeof Scoreboard> = {
  title: 'Scoreboard',
  args: {
    playerOne: {
      army: {
        codex: {
          id: 0,
          name: 'Adepta Sororitas',
          faction: 'imperium'
        },
        id: 0,
        detachment: {
          enhancements: [],
          id: 0,
          name: ''
        },
        name: 'Army One',
        points: 2000,
        roster: []
      },
      cp: 12,
      profile: {
        createdAt: '',
        id: '1',
        name: 'doranakan'
      },
      score: 23
    },
    playerTwo: {
      army: {
        codex: {
          id: 0,
          name: 'Adeptus Mechanicus',
          faction: 'imperium'
        },
        id: 0,
        detachment: {
          enhancements: [],
          id: 0,
          name: ''
        },
        name: 'Army Two',
        points: 1990,
        roster: []
      },
      cp: 12,
      profile: {
        createdAt: '',
        id: '2',
        name: 'ildenso'
      },
      score: 12
    }
  },
  component: Scoreboard
}

export default ScoreboardMeta

type Story = StoryObj<typeof Scoreboard>

export const Default: Story = {}
