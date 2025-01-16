import { skipToken } from '@reduxjs/toolkit/query'
import {
  Error,
  Loading,
  ScreenContainer,
  ScreenSubtitle,
  ScreenTitle,
  VStack
} from 'appdeptus/components'
import { type CreateGame } from 'appdeptus/models/game'
import { useGetArmyQuery } from 'appdeptus/modules/armies/api'
import { useLocalSearchParams } from 'expo-router'
import { useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import LeaderSelectionList from './LeaderSelectionList'

const LeaderSelectionScreen = () => {
  const { id: preselectedArmyId } = useLocalSearchParams<{
    id: string
  }>()

  const { data, isError } = useGetArmyQuery(preselectedArmyId ?? skipToken)

  const { setValue } = useFormContext<CreateGame>()

  const watch = useWatch<CreateGame>()

  const selectedArmy = watch.playerOne?.army

  useEffect(() => {
    if (data && !selectedArmy) {
      const { user: _user, ...army } = data
      setValue('playerOne.army', army)
    }
  }, [data, selectedArmy, setValue])

  if (isError) {
    return (
      <ScreenContainer
        className='bg-primary-950 p-4'
        space='md'
      >
        <Error />
      </ScreenContainer>
    )
  }

  if (!data || !selectedArmy) {
    return (
      <ScreenContainer
        className='bg-primary-950 p-4'
        space='md'
      >
        <Loading />
      </ScreenContainer>
    )
  }

  return <LeaderSelection />
}

const LeaderSelection = () => {
  const { watch } = useFormContext<CreateGame>()

  const codex = watch('playerOne.army.codex.name')

  return (
    <ScreenContainer
      className='bg-primary-950 p-4'
      space='md'
    >
      <ScreenTitle>{codex}</ScreenTitle>
      <ScreenSubtitle>choose your leaders</ScreenSubtitle>

      <VStack
        className='flex-1'
        space='md'
      >
        <LeaderSelectionList />
      </VStack>
    </ScreenContainer>
  )
}

export default LeaderSelectionScreen
