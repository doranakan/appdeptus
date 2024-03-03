import { type Model } from './model'
import { type UnitTier } from './unitTier'

type UnitComposition = {
  id: string
  tierId: UnitTier['id']
  count: number
  model: Model
}[]

export type { UnitComposition }
