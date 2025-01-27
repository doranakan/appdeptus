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
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { EllipsisVertical } from 'lucide-react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { PixelRatio, StyleSheet, useWindowDimensions } from 'react-native'
import { useGetArmyListQuery } from '../../api'
import { RosterTopContainer } from '../../components'
import OptionsBottomSheet from './OptionsBottomSheet'
import ref from './ref'
import { type Image } from 'expo-image'
import {
  BackdropBlur,
  Canvas,
  Fill,
  Group,
  makeImageFromView,
  type SkImage,
  Image as SkImageComponent
} from '@shopify/react-native-skia'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'

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
  const bgRef = useRef<Image>(null)
  const [snap, setSnap] = useState<SkImage | null>(null)
  const navigation = useNavigation()
  const opacity = useSharedValue(0)
  const { width, height } = useWindowDimensions()
  const { top } = useSafeAreaInsets()
  const scale = useSharedValue(1.2)
  const bgOpacity = useDerivedValue(() =>
    interpolate(scale.value, [1, 1.2], [0.8, 0], Extrapolation.CLAMP)
  )
  const [title, setTitle] = useState<string>()

  const rScale = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }))

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      scale.value = interpolate(
        contentOffset.y,
        [-100, 0, height * 0.4],
        [1.3, 1.2, 1],
        Extrapolation.CLAMP
      )

      if (contentOffset.y > height * 0.35) {
        opacity.value = withTiming(1)
        runOnJS(setTitle)(army.name)
      } else {
        runOnJS(setTitle)(undefined)
        opacity.value = withTiming(0)
      }
    }
  })

  useEffect(() => {
    dispatch(setTheme(army.codex.name))
    return () => {
      dispatch(resetTheme())
    }
  }, [army.codex.name, dispatch])

  const computeImage = useCallback(() => {
    makeImageFromView(bgRef).then((img) => {
      setSnap(img)
    })
  }, [])

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <VStack
          className='px-4 pb-4'
          style={[{ paddingTop: top }]}
        >
          <NavigationHeader
            variant='backButton'
            rightButton={{
              onPress: () => ref.current?.present(),
              variant: 'callback',
              icon: EllipsisVertical
            }}
            title={title}
          />
          {snap && (
            <Canvas style={StyleSheet.absoluteFill}>
              <Group opacity={opacity}>
                <SkImageComponent
                  image={snap}
                  x={0}
                  y={0}
                  fit='cover'
                  width={width}
                  height={snap.height() / PixelRatio.get()}
                />
                <BackdropBlur
                  blur={4}
                  clip={{ x: 0, y: 0, width, height }}
                >
                  <Fill color='rgba(0, 0, 0, 0.3)' />
                </BackdropBlur>
              </Group>
            </Canvas>
          )}
        </VStack>
      ),
      headerShown: true,
      headerTransparent: true
    })
  }, [army.codex.name, height, navigation, opacity, snap, title, top, width])

  return (
    <ScreenContainer safeAreaInsets={['bottom', 'top']}>
      <VStack className='absolute h-full w-full'>
        <Animated.View
          className='flex-1'
          style={rScale}
        >
          <ArmyBackground
            codex={army.codex.name}
            ref={bgRef}
            onImageDisplay={computeImage}
            gradientOpacity={bgOpacity}
          />
          <LinearGradient
            colors={[
              `${themeColors[army.codex.name].primary[950]}00`,
              themeColors[army.codex.name].primary[950]
            ]}
            style={styles.gradient}
          />
        </Animated.View>
        <VStack className='flex-1' />
      </VStack>
      <VStack className='flex-1 px-4'>
        <ArmyRoster
          hasPaddingTop
          ListHeaderComponent={
            <VStack space='md'>
              <RosterTopContainer army={army} />
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
          onScroll={onScroll}
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
