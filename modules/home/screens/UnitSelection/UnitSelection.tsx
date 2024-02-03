import { Box } from '@gluestack-ui/themed'
import { skipToken } from '@reduxjs/toolkit/query'
import { useMap } from 'ahooks'
import { Loading } from 'appdeptus/components'
import { Unit } from 'appdeptus/models'
import { useLocalSearchParams } from 'expo-router'
import React, { useCallback } from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import { useGetUnitsQuery } from '../../api'
import { UnitListItem } from '../../components'

const UnitSelectionScreen = () => {
  const { codexId } = useLocalSearchParams<{ codexId: string }>()

  const { data: units } = useGetUnitsQuery(codexId ?? skipToken)

  if (!units) {
    return <Loading />
  }

  return <UnitList units={units} />
}

const UnitList = ({ units }: UnitListProps) => {
  const [armyList, { set, get }] = useMap<Unit['id'], number>()

  const renderItem = useCallback<ListRenderItem<Unit>>(({ item: unit }) => {
    const count = get(unit.id) ?? 0
    return (
      <UnitListItem
        count={count}
        onPressDec={() => {
          set(unit.id, count - 1)
        }}
        onPressInc={() => {
          set(unit.id, count + 1)
        }}
        unit={unit}
      />
    )
  }, [])

  return (
    <FlatList
      data={units}
      ItemSeparatorComponent={() => <Box height='$4' />}
      keyExtractor={(unit) => unit.id}
      renderItem={renderItem}
      style={{ padding: 16 }}
    />
  )
}

type UnitListProps = {
  units: Unit[]
}

export default UnitSelectionScreen
