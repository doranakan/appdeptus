import type { Meta, StoryObj } from '@storybook/react'
import GameListItem from './GameListItem'

const GameListItemMeta: Meta<typeof GameListItem> = {
  title: 'GameListItem',
  component: GameListItem,
  args: {
    game: {
      id: 1,
      lastUpdate: '2025-01-01',
      playerOne: {
        army: {
          codex: {
            faction: 'chaos',
            id: 1,
            name: 'Death Guard'
          },
          detachment: { enhancements: [], id: 1, name: '' },
          id: 1,
          name: '',
          points: 1000,
          roster: []
        },
        cp: 0,
        profile: {
          createdAt: '2025-01-01',
          id: '1234',
          name: 'player one'
        },
        score: 25
      },
      playerTwo: {
        army: {
          codex: {
            faction: 'imperium',
            id: 1,
            name: 'Grey Knights'
          },
          detachment: { enhancements: [], id: 1, name: '' },
          id: 1,
          name: '',
          points: 1000,
          roster: []
        },
        cp: 0,
        profile: {
          createdAt: '2025-01-01',
          id: '5678',
          name: 'player two'
        },
        score: 30
      },
      status: 'ended'
    }
  }
}

export default GameListItemMeta

type Story = StoryObj<typeof GameListItem>

export const Default: Story = {}
