type Weapon = {
  id: string
  name: string
  type: 'ranged' | 'melee'
  stats: {
    range: string
    a: string
    bsWs?: string
    s: string
    ap: string
    d: string
  }
}

type BaseOption = {
  id: string
  replaces: Weapon['id']
}

type CodexOption = BaseOption & {
  count?: number
  weapons: Weapon[]
}

type OptionalWeapon = BaseOption & {
  weapon: Weapon
}

export type { CodexOption, OptionalWeapon, Weapon }
