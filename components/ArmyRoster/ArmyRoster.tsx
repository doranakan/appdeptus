import { type Army } from 'appdeptus/models'
import React, {
  forwardRef,
  memo,
  type PropsWithChildren,
  useMemo,
  useRef
} from 'react'
import { themeColors, VStack } from '../ui'
import { ScreenTitle, Text } from 'appdeptus/components'
import UnitListItem from '../UnitListItem'
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useScrollViewOffset
} from 'react-native-reanimated'
import { Dimensions, type View } from 'react-native'
import ref from 'appdeptus/modules/armies/screens/Army/ref'
import { EllipsisVertical } from 'lucide-react-native'
import NavigationHeader from '../NavigationHeader'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import ArmyBackground from '../ArmyBackground'
import { Blur, Canvas, Image, useImage } from '@shopify/react-native-skia'
import { useElementDimensions } from 'appdeptus/hooks'
import { armyBackgroundSource } from 'appdeptus/modules/armies/constants'
import TopContainer from 'appdeptus/modules/armies/screens/Army/TopContainer'

type UnitRosterProps = {
  army: Army
}

const pd = forwardRef<View, PropsWithChildren>((props, ref) => (
  <VStack
    {...props}
    className='w-full bg-red-400'
    ref={ref}
  />
))

pd.displayName = 'pd'

const { height: screenHeight, width: screenWidth } = Dimensions.get('window')

const UnitRoster = ({ army }: UnitRosterProps) => {
  const { roster: units, codex } = army

  const { top } = useSafeAreaInsets()
  const items = useMemo(
    () =>
      units.map((item) => (
        <UnitListItem
          item={item}
          key={
            item.type === 'embarked' || item.type === 'team'
              ? item.id
              : item.selectionId
          }
        />
      )),
    [units]
  )
  const scrollViewRef = useAnimatedRef<Animated.ScrollView>()
  const contentOffset = useScrollViewOffset(scrollViewRef)

  const headerRef = useRef<View>(null)
  const { height: headerHeight } = useElementDimensions(headerRef)

  const opacity = useDerivedValue(() =>
    interpolate(
      contentOffset.value,
      [0, screenHeight * 0.5 - headerHeight],
      [0, 1],
      Extrapolation.CLAMP
    )
  )

  const scale = useDerivedValue(() =>
    interpolate(
      contentOffset.value,
      [0, screenHeight * 0.5],
      [1, 1.4],
      Extrapolation.CLAMP
    )
  )

  const rScale = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }))

  const backgroundImage = useImage(armyBackgroundSource[codex.name])
  useAnimatedReaction(
    () => contentOffset.value,
    (curr) => {}
  )

  return (
    <>
      <Animated.View
        ref={headerRef}
        className='absolute z-50 w-full px-4 pb-4'
        style={[{ paddingTop: top }]}
      >
        <Canvas
          style={{
            width: screenWidth,
            height: headerHeight,
            position: 'absolute',
            zIndex: -1
          }}
        >
          <Image
            image={backgroundImage}
            x={0}
            y={0}
            height={headerHeight}
            width={screenWidth}
            fit='cover'
            opacity={opacity}
          />
          <Blur blur={5} />
        </Canvas>
        <NavigationHeader
          variant='backButton'
          rightButton={{
            onPress: () => ref.current?.present(),
            variant: 'callback',
            icon: EllipsisVertical
          }}
        />
      </Animated.View>
      <VStack className='absolute h-full w-full'>
        <Animated.View
          className='flex-1'
          style={rScale}
        >
          <ArmyBackground
            codex={codex.name}
            animatedOpacity={opacity}
          />
          <LinearGradient
            colors={[
              `${themeColors[codex.name].primary[950]}00`,
              themeColors[codex.name].primary[950]
            ]}
            style={{
              height: '100%',
              width: '100%'
            }}
          />
        </Animated.View>
        <VStack className='flex-1' />
      </VStack>
      <Animated.ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        className='px-4'
        stickyHeaderIndices={[1]}
        StickyHeaderComponent={pd}
      >
        <VStack style={{ height: screenHeight * 0.5 }} />
        <Animated.View className='z-50 pb-4'>
          <ScreenTitle>{army.name}</ScreenTitle>
        </Animated.View>
        <VStack space='md'>
          <TopContainer army={army} />
          <Text
            className='uppercase'
            family='body-bold'
          >
            units
          </Text>
          <VStack />
        </VStack>
        <VStack className='gap-4 pb-4'>{items}</VStack>
      </Animated.ScrollView>
    </>
  )
}

export default memo(UnitRoster)
