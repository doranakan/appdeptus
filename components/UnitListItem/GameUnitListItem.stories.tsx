import type { Meta, StoryObj } from '@storybook/react'
import UnitListItem from './GameUnitListItem'

const UnitListItemMeta: Meta<typeof UnitListItem> = {
  title: 'UnitListItem',
  component: UnitListItem
}

export default UnitListItemMeta

type Story = StoryObj<typeof UnitListItem>

export const Character: Story = {
  args: {
    item: {
      id: 0,
      name: 'Angron',
      selectionId: 'id',
      points: 100,
      models: [{ wounds: 0, killed: false }],
      type: 'character',
      upgrades: [],
      hero: true
    }
  }
}
export const Leader: Story = {
  args: {
    item: {
      id: 0,
      name: 'Khârn the Betrayer',
      selectionId: 'id',
      points: 100,
      models: [{ wounds: 0, killed: false }],
      type: 'leader',
      upgrades: [],
      hero: true
    }
  }
}
export const EnhancedLeader: Story = {
  args: {
    item: {
      id: 0,
      name: 'Khorne Chaos Lord',
      selectionId: 'id',
      points: 100,
      models: [{ wounds: 0, killed: false }],
      type: 'leader',
      upgrades: [],
      hero: false,
      enhancement: {
        id: 0,
        name: 'Enhancement name',
        points: 5
      }
    }
  }
}
export const Squad: Story = {
  args: {
    item: {
      id: 0,
      name: 'Khorne Berzerkers',
      selectionId: 'id',
      points: 100,
      models: [
        { wounds: 0, killed: false },
        { wounds: 0, killed: false },
        { wounds: 0, killed: false },
        { wounds: 0, killed: false },
        { wounds: 0, killed: false }
      ],
      type: 'squad',
      upgrades: []
    }
  }
}
export const Team: Story = {
  args: {
    item: {
      id: 'id',
      type: 'team',
      leader: {
        id: 0,
        name: 'Khârn the Betrayer',
        selectionId: 'id',
        points: 100,
        models: [{ wounds: 0, killed: false }],
        type: 'leader',
        upgrades: [],
        hero: true
      },
      bodyguard: {
        id: 0,
        name: 'Khorne Berzerker',
        selectionId: 'id',
        points: 100,
        models: [
          { wounds: 0, killed: false },
          { wounds: 0, killed: false },
          { wounds: 0, killed: false },
          { wounds: 0, killed: false },
          { wounds: 0, killed: false }
        ],
        type: 'squad',
        upgrades: []
      }
    }
  }
}
export const Embarked: Story = {
  args: {
    item: {
      id: 'id',
      type: 'embarked',
      crew: [
        {
          id: '0',
          type: 'team',
          leader: {
            id: 0,
            name: 'Khârn the Betrayer',
            selectionId: 'id',
            points: 100,
            models: [{ wounds: 0, killed: false }],
            type: 'leader',
            upgrades: [],
            hero: true
          },
          bodyguard: {
            id: 0,
            name: 'Khorne Berzerker',
            selectionId: 'id',
            points: 100,
            models: [
              { wounds: 0, killed: false },
              { wounds: 0, killed: false },
              { wounds: 0, killed: false },
              { wounds: 0, killed: false },
              { wounds: 0, killed: false }
            ],
            type: 'squad',
            upgrades: []
          }
        },
        {
          id: 0,
          name: 'Khorne Chaos Lord',
          selectionId: '1',
          points: 100,
          models: [{ wounds: 0, killed: false }],
          type: 'leader',
          upgrades: [],
          hero: false,
          enhancement: {
            id: 0,
            name: 'Enhancement name',
            points: 5
          }
        }
      ],
      transport: {
        id: 0,
        name: 'Chaos Rhino',
        selectionId: 'id',
        points: 100,
        models: [{ wounds: 0, killed: false }],
        type: 'transport',
        upgrades: []
      }
    }
  }
}
export const Transport: Story = {
  args: {
    item: {
      id: 0,
      name: 'World Eaters Rhino',
      selectionId: 'id',
      points: 100,
      models: [{ wounds: 0, killed: false }],
      type: 'transport',
      upgrades: []
    }
  }
}
export const Vehicle: Story = {
  args: {
    item: {
      id: 0,
      name: 'World Eaters Maulerfiend',
      selectionId: 'id',
      points: 100,
      models: [{ wounds: 0, killed: false }],
      type: 'vehicle',
      upgrades: []
    }
  }
}
export const Warlord: Story = {
  args: {
    item: {
      id: 0,
      name: 'Khârn the Betrayer',
      selectionId: 'id',
      points: 100,
      models: [{ wounds: 0, killed: false }],
      type: 'character',
      upgrades: [],
      warlord: true,
      hero: true
    }
  }
}
