import {
  ArmyRoster,
  Error,
  Loading,
  resetTheme,
  ScreenContainer,
  setTheme,
  VStack
} from 'appdeptus/components'
import { type Army } from 'appdeptus/models'
import { useAppDispatch } from 'appdeptus/store'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect } from 'react'
import { useGetArmyListQuery } from '../../api'
import OptionsBottomSheet from './OptionsBottomSheet'

const ArmyScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>()

  const { army } = useGetArmyListQuery(undefined, {
    selectFromResult: ({ data, ...rest }) => ({
      army: data?.find(({ id: armyId }) => armyId === Number(id)),
      ...rest
    })
  })

  if (!id) {
    return (
      <VStack className='items-center justify-center'>
        <Error />
      </VStack>
    )
  }

  if (!army) {
    return (
      <VStack className='items-center justify-center'>
        <Loading />
      </VStack>
    )
  }

  return <ArmyContainer army={army} />
}

type ArmyContainerProps = {
  army: Army
}

const ArmyContainer = ({ army }: ArmyContainerProps) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setTheme(army.codex.name))
    return () => {
      dispatch(resetTheme())
    }
  })

  return (
    <ScreenContainer>
      <ArmyRoster army={army} />
      <OptionsBottomSheet army={army} />
    </ScreenContainer>
  )
}

export default ArmyScreen
