import { Box } from '@gluestack-ui/themed'
import { skipToken } from '@reduxjs/toolkit/query'
import { useMap } from 'ahooks'
import { Loading } from 'appdeptus/components'
import { Unit } from 'appdeptus/models'
import { useLocalSearchParams } from 'expo-router'
import React, { useCallback } from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import { useGetUnitsQuery } from '../../api'
import { UnitListHeader, UnitListItem } from '../../components'

const UnitSelectionScreen = () => {
  const { codexId } = useLocalSearchParams<{ codexId: string }>()

  const { data: units } = useGetUnitsQuery(codexId ?? skipToken)

  const [armyList, { set, get }] = useMap<Unit['id'], Unit['tiers']>()

  const renderItem = useCallback<ListRenderItem<Unit>>(
    ({ item: unit }) => {
      const tiers = get(unit.id) ?? []
      return (
        <UnitListItem
          onPressAdd={() => {
            set(unit.id, [...tiers, unit.tiers[0]])
          }}
          onEditConfigs={(configs) => {
            set(unit.id, configs)
          }}
          selectedConfig={tiers}
          unit={unit}
        />
      )
    },
    [armyList]
  )

  if (!units || !codexId) {
    return <Loading />
  }

  return (
    <>
      <UnitListHeader
        armyList={Array.from(armyList.values()).flat()}
        codexId={codexId}
      />
      <FlatList
        data={units}
        ItemSeparatorComponent={() => <Box height='$4' />}
        keyExtractor={(unit) => unit.id}
        renderItem={renderItem}
        style={{ padding: 16 }}
      />
    </>
  )
}

export default UnitSelectionScreen
