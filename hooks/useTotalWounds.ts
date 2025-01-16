import { type GameUnit } from 'appdeptus/models'
import { useMemo } from 'react'

const useTotalWounds = (unit: GameUnit) =>
  useMemo(
    () => unit.models.reduce((acc, model) => acc + model.wounds, 0),
    [unit]
  )

export default useTotalWounds
