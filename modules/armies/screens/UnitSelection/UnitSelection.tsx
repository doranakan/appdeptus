import { Box } from '@gluestack-ui/themed'
import { skipToken } from '@reduxjs/toolkit/query'
import { Loading } from 'appdeptus/components'
import { type CodexUnit } from 'appdeptus/models'
import { useLocalSearchParams } from 'expo-router'
import React, { useCallback } from 'react'
import { FlatList, StyleSheet, type ListRenderItem } from 'react-native'
import { useGetCodexUnitsQuery } from '../../api'
import { UnitListHeader, UnitListItem } from '../../components'

const UnitSelectionScreen = () => {
  const { armyId, codexId } = useLocalSearchParams<{
    armyId: string
    codexId: string
  }>()

  const { data: units } = useGetCodexUnitsQuery(codexId ?? skipToken)

  const renderItem = useCallback<ListRenderItem<CodexUnit>>(
    ({ item: unit, index }) => {
      return (
        <UnitListItem
          codexId={codexId}
          unitIndex={index}
          unit={unit}
        />
      )
    },
    [codexId]
  )

  if (!units || !codexId) {
    return <Loading />
  }

  return (
    <>
      <UnitListHeader
        armyId={armyId}
        codexId={codexId}
      />
      <FlatList
        data={units}
        ItemSeparatorComponent={() => <Box height='$4' />}
        ListFooterComponent={() => <Box height='$8' />}
        keyExtractor={(unit) => unit.id}
        renderItem={renderItem}
        style={styles.flatList}
      />
    </>
  )
}

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    padding: 16
  }
})

export default UnitSelectionScreen
