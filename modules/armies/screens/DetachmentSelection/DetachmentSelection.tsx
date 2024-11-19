import { skipToken } from '@reduxjs/toolkit/query'
import { useUnmount } from 'ahooks'
import { ScreenContainer, VStack } from 'appdeptus/components'
import { type ArmyBuilder } from 'appdeptus/models'
import { useLocalSearchParams } from 'expo-router'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useGetArmyListQuery } from '../../api'
import { ArmyBuilderBackground, TopBar } from '../../components'
import DetachmentList from './DetachmentList'

const DetachmentSelectionScreen = () => {
  const { watch, reset, getValues } = useFormContext<ArmyBuilder>()

  const { id } = useLocalSearchParams<{ id: string }>()

  const selectedCodex = watch('codex')

  const { army } = useGetArmyListQuery(!id ? skipToken : undefined, {
    selectFromResult: ({ data, ...rest }) => ({
      army: data?.find(({ id: armyId }) => armyId === Number(id)),
      ...rest
    })
  })

  useEffect(() => {
    if (army) {
      reset({
        codex: army.codex,
        detachment: army.composition.detachment,
        id: army.id,
        name: army.name,
        points: army.points,
        units: [
          ...army.composition.characters,
          ...army.composition.leaders,
          ...army.composition.squads,
          ...army.composition.teams.flatMap(({ id, leader, bodyguard }) => [
            { ...leader, teamId: id },
            { ...bodyguard, teamId: id }
          ]),
          ...army.composition.transports,
          ...army.composition.vehicles
        ]
      })
    }
  }, [army, reset])

  useUnmount(() => {
    reset({
      ...getValues(),
      detachment: undefined,
      units: [],
      points: 0
    })
  })

  return (
    <ScreenContainer safeAreaInsets={['bottom']}>
      <ArmyBuilderBackground />
      <VStack
        className='flex-1 px-4 pb-0 pt-4'
        space='md'
      >
        <TopBar
          subtitle='detachments'
          title={selectedCodex?.name}
        />
        <DetachmentList />
      </VStack>
    </ScreenContainer>
  )
}

export default DetachmentSelectionScreen
