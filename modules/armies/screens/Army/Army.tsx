import { skipToken } from '@reduxjs/toolkit/query'
import {
  ArmyBackground,
  ArmyRoster,
  Card,
  Error,
  HStack,
  IconBadge,
  Loading,
  NavigationHeader,
  ScreenContainer,
  setTheme,
  Text,
  themeColors,
  VStack
} from 'appdeptus/components'
import { type Army } from 'appdeptus/models'
import { useGetUserProfileQuery } from 'appdeptus/modules/user/api'
import { useAppDispatch } from 'appdeptus/store'
import { LinearGradient } from 'expo-linear-gradient'
import { useLocalSearchParams } from 'expo-router'
import { Component, EllipsisVertical } from 'lucide-react-native'
import { useCallback, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { useGetArmyQuery, useGetInvalidUnitsQuery } from '../../api'
import { RosterTopContainer } from '../../components'
import OptionsBottomSheet from './OptionsBottomSheet'
import ref from './ref'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated'

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
const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient)

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

  const scaling = useSharedValue(1)
  const onOverScroll = useCallback(
    (num: number) => {
      'worklet'
      scaling.value = interpolate(num, [0, 250], [1, 1.1])
    },
    [scaling]
  )

  const rArtworkStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaling.value }],
    flex: 1
  }))
  const rGradientStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scaling.value, [1, 1.1], [1, 0])
  }))

  return (
    <ScreenContainer safeAreaInsets={['top']}>
      <VStack className='absolute h-full w-full'>
        <Animated.View style={rArtworkStyle}>
          <ArmyBackground codex={army.codex.name} />
          <AnimatedGradient
            colors={[
              `${themeColors[army.codex.name].primary[950]}00`,
              themeColors[army.codex.name].primary[950]
            ]}
            style={[rGradientStyle, styles.gradient]}
          />
        </Animated.View>
        <VStack className='flex-1' />
      </VStack>
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
          onOverScroll={onOverScroll}
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
                detachments
              </Text>
              <VStack space='md'>
                {army.detachments.map((detachment) => (
                  <Card key={detachment.id}>
                    <HStack
                      className='items-center justify-between p-4'
                      space='md'
                    >
                      <HStack
                        className='flex-1 items-center'
                        space='md'
                      >
                        <IconBadge Icon={Component} />
                        <Text
                          className='line-clamp-1 flex-1'
                          family='body-bold'
                        >
                          {detachment.name}
                        </Text>
                      </HStack>
                      <Text
                        className='uppercase'
                        family='body-bold'
                        size='sm'
                      >{`${detachment.detachmentPoints}dp`}</Text>
                    </HStack>
                  </Card>
                ))}
              </VStack>
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

const styles = StyleSheet.create({
  gradient: {
    height: '100%',
    width: '100%'
  }
})

export default ArmyScreen
