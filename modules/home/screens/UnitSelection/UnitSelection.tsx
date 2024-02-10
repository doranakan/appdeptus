import { Box } from '@gluestack-ui/themed'
import { skipToken } from '@reduxjs/toolkit/query'
import { useMap } from 'ahooks'
import { Loading } from 'appdeptus/components'
import { CodexUnit } from 'appdeptus/models'
import { useLocalSearchParams } from 'expo-router'
import React, { useCallback } from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import { useGetCodexUnitsQuery } from '../../api'
import { UnitListHeader, UnitListItem } from '../../components'

const UnitSelectionScreen = () => {
  const { codexId } = useLocalSearchParams<{ codexId: string }>()

  const { data: units } = useGetCodexUnitsQuery(codexId ?? skipToken)

  const [army, { set, get }] = useMap<CodexUnit['id'], CodexUnit['tiers']>()

  const renderItem = useCallback<ListRenderItem<CodexUnit>>(
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
    [army]
  )

  if (!units || !codexId) {
    return <Loading />
  }

  return (
    <>
      <UnitListHeader
        army={Object.fromEntries(army)}
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
