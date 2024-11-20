import {
  ArmyBackground,
  ArmyRoster,
  Error,
  Loading,
  NavigationHeader,
  resetTheme,
  ScreenContainer,
  setTheme,
  Text,
  themeColors,
  VStack
} from 'appdeptus/components'
import { type Army } from 'appdeptus/models'
import { useAppDispatch } from 'appdeptus/store'
import { LinearGradient } from 'expo-linear-gradient'
import { useLocalSearchParams } from 'expo-router'
import { EllipsisVertical } from 'lucide-react-native'
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { useGetArmyListQuery } from '../../api'
import EnhancementList from './EnhancementList'
import OptionsBottomSheet from './OptionsBottomSheet'
import TopContainer from './TopContainer'
import ref from './ref'

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
    <ScreenContainer safeAreaInsets={['bottom', 'top']}>
      <VStack className='absolute h-full w-full'>
        <VStack className='flex-1'>
          <ArmyBackground codex={army.codex.name} />
          <LinearGradient
            colors={[
              `${themeColors[army.codex.name].primary[950]}00`,
              themeColors[army.codex.name].primary[950]
            ]}
            style={styles.gradient}
          />
        </VStack>
        <VStack className='flex-1' />
      </VStack>
      <VStack className='flex-1 px-4'>
        <NavigationHeader
          variant='backButton'
          rightButton={{
            onPress: () => ref.current?.present(),
            variant: 'callback',
            icon: EllipsisVertical
          }}
        />
        <ArmyRoster
          ListHeaderComponent={
            <VStack
              className='py-4'
              space='md'
            >
              <TopContainer army={army} />
              {army.detachment.enhancements.length > 0 ? (
                <VStack space='md'>
                  <Text
                    className='uppercase'
                    family='body-bold'
                  >
                    enhancements
                  </Text>
                  <EnhancementList
                    enhancements={army.detachment.enhancements}
                  />
                </VStack>
              ) : null}
              <Text
                className='uppercase'
                family='body-bold'
              >
                units
              </Text>
            </VStack>
          }
          roster={army.roster}
        />
      </VStack>
      <OptionsBottomSheet army={army} />
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  gradient: {
    height: '100%',
    width: '100%'
  }
})

export default ArmyScreen
