import { skipToken } from '@reduxjs/toolkit/query'
import {
  ArmyRoster,
  Error,
  Loading,
  NavigationHeader,
  ScreenContainer,
  setTheme,
  Text,
  VStack
} from 'appdeptus/components'
import { type Army } from 'appdeptus/models'
import { useGetUserProfileQuery } from 'appdeptus/modules/user/api'
import { useAppDispatch } from 'appdeptus/store'
import { useLocalSearchParams } from 'expo-router'
import { EllipsisVertical } from 'lucide-react-native'
import React, { useEffect } from 'react'
import { useGetArmyQuery, useGetInvalidUnitsQuery } from '../../api'
import { RosterTopContainer } from '../../components'
import OptionsBottomSheet from './OptionsBottomSheet'
import ref from './ref'

const ArmyScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>()

  const { data: army, isError, isFetching } = useGetArmyQuery(id)

  if (!id || isError) {
    return (
      <ScreenContainer>
        <Error />
      </ScreenContainer>
    )
  }

  if (!army || isFetching) {
    return (
      <ScreenContainer>
        <Loading />
      </ScreenContainer>
    )
  }

  return <ArmyContainer army={army} />
}

type ArmyContainerProps = {
  army: Army
}

const ArmyContainer = ({ army }: ArmyContainerProps) => {
  const { data: invalidUnits } = useGetInvalidUnitsQuery(
    army.isValid ? skipToken : army
  )

  const { data: user } = useGetUserProfileQuery()

  const isUsersArmy = user?.id === army.user.id

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setTheme(army.codex.name))
  })

  return (
    <ScreenContainer safeAreaInsets={['bottom', 'top']}>
      <VStack
        className='flex-1 px-4'
        space='md'
      >
        <NavigationHeader
          variant='backButton'
          rightButton={{
            onPress: () => ref.current?.present(),
            variant: 'callback',
            icon: EllipsisVertical
          }}
        />
        <ArmyRoster
          codexName={army.codex.name}
          ListHeaderComponent={
            <VStack space='md'>
              <RosterTopContainer
                army={army}
                isUsersArmy={isUsersArmy}
              />
              <Text
                className='uppercase'
                family='body-bold'
              >
                units
              </Text>
              <VStack />
            </VStack>
          }
          roster={army.roster}
          invalidUnits={invalidUnits}
        />
      </VStack>
      <OptionsBottomSheet
        army={army}
        isUsersArmy={isUsersArmy}
      />
    </ScreenContainer>
  )
}

export default ArmyScreen
