import { skipToken } from '@reduxjs/toolkit/query'
import {
  Error,
  Loading,
  ScreenContainer,
  ScreenSubtitle,
  ScreenTitle,
  VStack
} from 'appdeptus/components'
import { type NewGame } from 'appdeptus/models/game'
import { useGetArmyQuery } from 'appdeptus/modules/armies/api'
import { useLocalSearchParams } from 'expo-router'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import LeaderSelectionList from './LeaderSelectionList'

const LeaderSelectionScreen = () => {
  const { id: preselectedArmyId } = useLocalSearchParams<{
    id: string
  }>()

  const { data, isError } = useGetArmyQuery(preselectedArmyId ?? skipToken)

  const { setValue, watch } = useFormContext<NewGame>()

  const selectedArmy = watch('playerOne.army')

  useEffect(() => {
    if (data && !selectedArmy) {
      const { user: _, ...army } = data
      setValue('playerOne.army', army)
    }
  })

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
  const { watch } = useFormContext<NewGame>()

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
