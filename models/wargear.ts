import { type CodexOption, type Weapon } from './weapon'

type Wargear = {
  baseWargear: {
    id: string
    weapon: Weapon
  }[]
  options?: CodexOption[]
}

export type { Wargear }
