import { skipToken } from '@reduxjs/toolkit/query'
import { ModelList } from 'appdeptus/modules/armies/components'
import { useLocalSearchParams } from 'expo-router'
import { useGetGameArmyQuery } from '../../api'

const UnitDetail = () => {
  const { armyId, tierId, unitId } = useLocalSearchParams<{
    armyId: string
    tierId: string
    unitId: string
  }>()

  const { army, unit } = useGetGameArmyQuery(armyId ?? skipToken, {
    selectFromResult: ({ data, ...rest }) => {
      if (!data) {
        return { army: undefined, unit: undefined }
      }

      const unit = data.units.find(({ id }) => unitId === id)

      return {
        army: data,
        unit,
        ...rest
      }
    }
  })

  return (
    <ModelList
      army={army}
      tierId={tierId}
      unit={unit}
    />
  )
}

export default UnitDetail
