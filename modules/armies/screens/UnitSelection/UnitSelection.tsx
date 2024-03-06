import { Box } from '@gluestack-ui/themed'
import { skipToken } from '@reduxjs/toolkit/query'
import { Loading } from 'appdeptus/components'
import { type ArmyForm, type CodexUnit } from 'appdeptus/models'
import { useLocalSearchParams } from 'expo-router'
import React, { useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { FlatList, StyleSheet, type ListRenderItem } from 'react-native'
import { useGetArmyToEditQuery, useGetCodexUnitsQuery } from '../../api'
import { UnitListHeader } from '../../components'
import UnitListItem from './UnitListItem'

const UnitSelectionScreen = () => {
  const { armyId, codexId } = useLocalSearchParams<{
    armyId: string
    codexId: string
  }>()

  const { data: armyToEdit, isFetching } = useGetArmyToEditQuery(
    armyId ?? skipToken
  )

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

  const { reset } = useFormContext<ArmyForm>()

  useEffect(() => {
    if (armyToEdit) {
      reset(armyToEdit)
    }
  }, [armyToEdit, reset])

  if (!units || !codexId || isFetching) {
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
