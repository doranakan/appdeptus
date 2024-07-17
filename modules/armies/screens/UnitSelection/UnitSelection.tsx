import { Box, HStack, VStack } from '@gluestack-ui/themed'
import { skipToken } from '@reduxjs/toolkit/query'
import { Header, Loading } from 'appdeptus/components'
import { type ArmyForm } from 'appdeptus/models'
import { useLocalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { ChevronLeft, HelpCircle } from 'lucide-react-native'
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
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

  const insets = useSafeAreaInsets()

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
      <StatusBar
        animated
        style='dark'
      />
      <VStack
        h='$full'
        position='absolute'
        w='$full'
      >
        <CodexCoverImage codexName={codex.name} />
      </VStack>
      <VStack
        pt={insets.top}
        px='$4'
      >
        <Header
          color='secondary700'
          title='Build army'
          left={{
            href: '../',
            Icon: ChevronLeft
          }}
          right={{
            href: '../',
            Icon: HelpCircle
          }}
        />
      </VStack>
      <HStack flex={1}>
        <VStack
          alignItems='center'
          h='$full'
          mt='$4'
          w='$16'
        >
          <Box
            bgColor='$secondary700'
            h='$full'
            w='$8'
          />
        </VStack>
        <VStack flex={1}>
          <UnitListHeader
            armyId={armyId}
            codex={codex}
          />
          <UnitList
            codexId={codex.id}
            units={units}
          />
        </VStack>
      </HStack>
    </VStack>
  )
}

export default UnitSelectionScreen
