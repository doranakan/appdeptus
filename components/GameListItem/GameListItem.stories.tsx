import type { Meta, StoryObj } from '@storybook/react'
import { type EndedGame } from 'appdeptus/models/game'
import GameListItem from './GameListItem'

const baseGame = {
  id: 1,
  lastUpdate: '2025-01-01',
  round: 5,
  turn: 10,
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
    score: 25,
    isActive: true,
    isReady: true
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
    score: 30,
    isActive: false,
    isReady: true
  },
  status: 'ended'
} satisfies EndedGame

const GameListItemMeta: Meta<typeof GameListItem> = {
  title: 'GameListItem',
  component: GameListItem,
  args: {
    game: baseGame
  }
}

export default GameListItemMeta

type Story = StoryObj<typeof GameListItem>

export const Default: Story = {}
export const Ranked: Story = {
  args: {
    game: {
      ...baseGame,
      community: {
        createdAt: '2025-03-05',
        id: 1,
        isSecret: false,
        name: 'Officio Martellorum',
        image:
          'https://scontent-zrh1-1.xx.fbcdn.net/v/t39.30808-1/408108875_338301902240153_1515720919691253208_n.jpg?stp=c10.8.545.545a_dst-jpg_s480x480_tt6&_nc_cat=110&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=JOsHDxd9NqUQ7kNvgGa1zOU&_nc_oc=AdmDEBn_0FZ2AQPcxuqX0dhhCwqAeGfo1ZG0cnmIWFlC_OOUQbtJhyXu22LO1LXei4I&_nc_zt=24&_nc_ht=scontent-zrh1-1.xx&_nc_gid=4hBJi3HRpOr3l7iE-zyyXA&oh=00_AYFBQnsqKiEsPOSx0SCfomgfuzdc5E2nSuFB27D_i9ueGg&oe=67E0CDEF'
      }
    }
  }
}
