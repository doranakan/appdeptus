import type { Meta, StoryObj } from '@storybook/react'
import GameArmyRoster from './GameArmyRoster'

const GameArmyRosterMeta: Meta<typeof GameArmyRoster> = {
  title: 'GameArmyRoster',
  component: GameArmyRoster,
  args: {
    roster: [
      {
        id: 0,
        name: 'Angron',
        selectionId: '0',
        models: [
          {
            killed: false,
            wounds: 1
          }
        ],
        points: 435,
        upgrades: [],
        type: 'character',
        warlord: true,
        hero: true
      },
      {
        id: 1,
        name: 'Khorne Berzerkers',
        selectionId: '1',
        models: [
          {
            killed: false,
            wounds: 0
          },
          {
            killed: false,
            wounds: 0
          },
          {
            killed: false,
            wounds: 0
          },
          {
            killed: false,
            wounds: 0
          },
          {
            killed: false,
            wounds: 0
          }
        ],
        points: 180,
        upgrades: [],
        type: 'squad'
      },
      {
        id: 2,
        name: 'Jakhals',
        selectionId: '2',
        models: [
          {
            killed: false,
            wounds: 0
          },
          {
            killed: false,
            wounds: 0
          },
          {
            killed: false,
            wounds: 0
          },
          {
            killed: false,
            wounds: 0
          },
          {
            killed: false,
            wounds: 0
          },
          {
            killed: false,
            wounds: 0
          },
          {
            killed: false,
            wounds: 0
          },
          {
            killed: true,
            wounds: 0
          },
          {
            killed: true,
            wounds: 0
          },
          {
            killed: true,
            wounds: 0
          }
        ],
        points: 160,
        upgrades: [],
        type: 'squad'
      }
    ]
  }
}

export default GameArmyRosterMeta

type Story = StoryObj<typeof GameArmyRoster>

export const Default: Story = {}
