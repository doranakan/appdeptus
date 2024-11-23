import { type Embarked, type Team, type Unit } from 'appdeptus/models'
import { useMemo } from 'react'

const useCrew = (units: (Unit | Team | Embarked)[]) =>
  useMemo(
    () =>
      units
        .filter<Embarked>((unit): unit is Embarked => unit.type === 'embarked')
        .flatMap(({ crew, transport }) => [...crew, transport]),
    [units]
  )

export default useCrew
