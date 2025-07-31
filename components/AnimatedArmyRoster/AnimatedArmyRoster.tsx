import { type Army } from 'appdeptus/models'
import React, { type ComponentProps, createRef, memo, useRef } from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native'
import { themeColors, VStack } from '../ui'
import {
  Gesture,
  GestureDetector,
  ScrollView
} from 'react-native-gesture-handler'
import Animated, {
  makeMutable,
  runOnJS,
  useAnimatedStyle
} from 'react-native-reanimated'
import ArmyBackground from '../ArmyBackground'
import { LinearGradient } from 'expo-linear-gradient'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import useArmyRosterBackgroundAnimation from 'appdeptus/modules/armies/hooks/useArmyRosterBackgroundAnimation'
import ArmyRoster from '../ArmyRoster'

type AnimatedArmyRosterProps = Partial<
  Omit<ComponentProps<typeof Animated.FlatList<Army['roster'][number]>>, 'data'>
> & {
  codexName: Army['codex']['name']
  roster: Army['roster']
  invalidUnits?: Army['roster'][number]['id'][]
}

const AnimatedArmyRoster = ({
  roster,
  codexName,
  invalidUnits,
  ...rest
}: AnimatedArmyRosterProps) => {
  const { width: screenWidth } = useWindowDimensions()
  const { top: topInset } = useSafeAreaInsets()

  const {
    onScroll,
    scale,
    scrollValue,
    panGesture,
    panGestureRef,
    panScrollValue
  } = useArmyRosterBackgroundAnimation()

  const pan = panScrollValue ?? makeMutable(0)

  const rFlatListStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: pan.value }]
  }))

  const rBgStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }))

  const flatListRef = useRef<Animated.FlatList<Army['roster'][number]>>(null)
  const revealArtwork = (offset: number) =>
    flatListRef.current?.scrollToOffset({
      offset,
      animated: true
    })

  const onScrollEnd = () => {
    'worklet'
    if (scrollValue.value > 0) {
      return
    }
    if (scrollValue.value > -100) {
      runOnJS(revealArtwork)(0)
      return
    }
    runOnJS(revealArtwork)(-200)
  }

  return (
    <>
      <VStack
        className='absolute -z-10 h-full'
        style={{ width: screenWidth, top: -topInset }}
      >
        <VStack className='flex-1'>
          <ArmyBackground
            codex={codexName}
            scale={scale}
          />
          <Animated.View
            className='flex-1'
            style={rBgStyle}
          >
            <LinearGradient
              colors={[
                `${themeColors[codexName].primary[950]}00`,
                `${themeColors[codexName].primary[950]}00`,
                themeColors[codexName].primary[950]
              ]}
              style={styles.gradient}
            />
          </Animated.View>
        </VStack>
        <VStack className='flex-1' />
      </VStack>

      <GestureDetector gesture={panGesture ?? Gesture.Pan().enabled(false)}>
        <ArmyRoster
          {...rest}
          roster={roster}
          ref={flatListRef}
          onScroll={onScroll}
          onScrollEndDrag={onScrollEnd}
          style={rFlatListStyle}
          invalidUnits={invalidUnits}
          renderScrollComponent={(props) => (
            <ScrollView
              {...props}
              simultaneousHandlers={[panGestureRef ?? createRef()]}
            />
          )}
          overScrollMode='never'
          scrollToOverflowEnabled
        />
      </GestureDetector>
    </>
  )
}

const styles = StyleSheet.create({
  gradient: {
    height: '100%',
    width: '100%'
  }
})

export default memo(AnimatedArmyRoster)
