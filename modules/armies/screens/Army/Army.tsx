import {
  ArmyBackground,
  Error,
  Loading,
  resetTheme,
  ScreenContainer,
  setTheme,
  themeColors,
  VStack
} from 'appdeptus/components'
import { type Army } from 'appdeptus/models'
import { useAppDispatch } from 'appdeptus/store'
import { LinearGradient } from 'expo-linear-gradient'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { useGetArmyListQuery } from '../../api'
import CompositionTab from './CompositionTab'
import OptionsBottomSheet from './OptionsBottomSheet'
import TopContainer from './TopContainer'

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
      <ScreenContainer
        safeAreaInsets={['bottom']}
        className='items-center justify-center'
      >
        <Error />
      </ScreenContainer>
    )
  }

  if (!army) {
    return (
      <ScreenContainer
        safeAreaInsets={['bottom']}
        className='items-center justify-center'
      >
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
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setTheme(army.codex.name))
    return () => {
      dispatch(resetTheme())
    }
  })

  return (
    <ScreenContainer safeAreaInsets={['bottom']}>
      <VStack
        className='flex-1'
        space='md'
      >
        <VStack className='flex-1'>
          <ArmyBackground codex={army.codex.name} />
          <LinearGradient
            colors={[
              `${themeColors[army.codex.name].primary[950]}00`,
              themeColors[army.codex.name].primary[950]
            ]}
            style={styles.gradient}
          />
          <TopContainer army={army} />
        </VStack>
        <VStack className='flex-1 px-4'>
          <CompositionTab composition={army.composition} />
        </VStack>
      </VStack>
      <OptionsBottomSheet army={army} />
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  gradient: {
    height: '100%',
    position: 'absolute',
    width: '100%'
  }
})

export default ArmyScreen
