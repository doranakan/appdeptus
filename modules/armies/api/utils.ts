import { type Weapon } from 'appdeptus/models'
import { type z } from 'zod'
import { type weaponSchema } from './schemas'

const parseWeapon = (weapon: z.infer<typeof weaponSchema>): Weapon => {
  const { id, name, range, bs_ws, ...weaponStats } = weapon

  return {
    id,
    name,
    type: range?.length ? 'ranged' : 'melee',
    stats: {
      range: range?.length ? range : '-',
      bsWs: bs_ws,
      ...weaponStats
    }
  }
}

export { parseWeapon }
