import type { Meta, StoryObj } from '@storybook/react'
import UnitListItem from './UnitListItem'

const UnitListItemMeta: Meta<typeof UnitListItem> = {
  title: 'UnitListItem',
  component: UnitListItem,
  args: {
    warlord: false
  }
}

export default UnitListItemMeta

type Story = StoryObj<typeof UnitListItem>

export const Character: Story = {
  args: {
    unitOrTeam: {
      id: 0,
      name: 'Angron',
      selectionId: 'id',
      tier: { id: 0, models: 1, points: 415 },
      type: 'character',
      upgrades: [],
      hero: true
    }
  }
}
export const Leader: Story = {
  args: {
    unitOrTeam: {
      id: 0,
      name: 'Khârn the Betrayer',
      selectionId: 'id',
      tier: { id: 0, models: 1, points: 95 },
      type: 'leader',
      upgrades: [],
      hero: true
    }
  }
}
export const Squad: Story = {
  args: {
    unitOrTeam: {
      id: 0,
      name: 'Khorne Berzerkers',
      selectionId: 'id',
      tier: { id: 0, models: 10, points: 230 },
      type: 'squad',
      upgrades: []
    }
  }
}
export const Team: Story = {
  args: {
    unitOrTeam: {
      id: 'id',
      type: 'team',
      leader: {
        id: 0,
        name: 'Khârn the Betrayer',
        selectionId: 'id',
        tier: { id: 0, models: 1, points: 85 },
        type: 'leader',
        upgrades: [],
        hero: true
      },
      bodyguard: {
        id: 0,
        name: 'Khorne Berzerker',
        selectionId: 'id',
        tier: { id: 0, models: 1, points: 85 },
        type: 'squad',
        upgrades: []
      }
    }
  }
}
export const Transport: Story = {
  args: {
    unitOrTeam: {
      id: 0,
      name: 'World Eaters Rhino',
      selectionId: 'id',
      tier: { id: 0, models: 1, points: 85 },
      type: 'transport',
      upgrades: []
    }
  }
}
export const Vehicle: Story = {
  args: {
    unitOrTeam: {
      id: 0,
      name: 'World Eaters Maulerfiend',
      selectionId: 'id',
      tier: { id: 0, models: 1, points: 175 },
      type: 'vehicle',
      upgrades: []
    }
  }
}
