import { Box, HStack, VStack } from '@gluestack-ui/themed'
import { skipToken } from '@reduxjs/toolkit/query'
import { Loading } from 'appdeptus/components'
import { type ArmyForm } from 'appdeptus/models'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  useGetArmyToEditQuery,
  useGetCodexQuery,
  useGetCodexUnitsQuery
} from '../../api'
import { CodexCoverImage, UnitListHeader } from '../../components'
import UnitList from './UnitList'

const UnitSelectionScreen = () => {
  const { armyId, codexId } = useLocalSearchParams<{
    armyId: string
    codexId: string
  }>()

  const { data: armyToEdit, isFetching } = useGetArmyToEditQuery(
    armyId ?? skipToken
  )

  const { data: codex } = useGetCodexQuery(codexId ?? skipToken)

  const { data: units } = useGetCodexUnitsQuery(codexId ?? skipToken)

  const { reset } = useFormContext<ArmyForm>()

  useEffect(() => {
    if (armyToEdit) {
      reset(armyToEdit)
    }
  }, [armyToEdit, reset])

  if (!codex || !units || !codexId || isFetching) {
    return <Loading />
  }

  return (
    <VStack flex={1}>
      <CodexCoverImage codexName={codex.name} />
      <VStack
        flex={1}
        h='$full'
        position='absolute'
        w='$full'
      >
        <HStack flex={1}>
          <VStack
            h='$full'
            px='$4'
            w='$12'
          >
            <Box
              bgColor='$secondary700'
              h='$full'
              w='$full'
            />
          </VStack>
          <VStack flex={1}>
            <UnitListHeader
              armyId={armyId}
              codexId={codexId}
            />
            <UnitList
              codexId={codex.id}
              units={units}
            />
          </VStack>
        </HStack>
      </VStack>
    </VStack>
  )
}

export default UnitSelectionScreen
