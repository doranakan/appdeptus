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
      id: 'id',
      name: 'Angron',
      tier: { id: 'id', models: 1, points: 415 },
      type: 'character',
      upgrades: []
    }
  }
}
export const Leader: Story = {
  args: {
    unitOrTeam: {
      id: 'id',
      name: 'Khârn the Betrayer',
      tier: { id: 'id', models: 1, points: 95 },
      type: 'leader',
      upgrades: []
    }
  }
}
export const Squad: Story = {
  args: {
    unitOrTeam: {
      id: 'id',
      name: 'Khorne Berzerkers',
      tier: { id: 'id', models: 10, points: 230 },
      type: 'squad',
      upgrades: []
    }
  }
}
export const Team: Story = {
  args: {
    unitOrTeam: {
      leader: {
        id: 'id',
        name: 'Khârn the Betrayer',
        tier: { id: 'id', models: 1, points: 85 },
        type: 'leader',
        upgrades: []
      },
      bodyguard: {
        id: 'id',
        name: 'Khorne Berzerker',
        tier: { id: 'id', models: 1, points: 85 },
        type: 'squad',
        upgrades: []
      }
    }
  }
}
export const Transport: Story = {
  args: {
    unitOrTeam: {
      id: 'id',
      name: 'World Eaters Rhino',
      tier: { id: 'id', models: 1, points: 85 },
      type: 'transport',
      upgrades: []
    }
  }
}
export const Vehicle: Story = {
  args: {
    unitOrTeam: {
      id: 'id',
      name: 'World Eaters Maulerfiend',
      tier: { id: 'id', models: 1, points: 175 },
      type: 'vehicle',
      upgrades: []
    }
  }
}
