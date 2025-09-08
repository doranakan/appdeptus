import { useMemo } from 'react'
import {
  useSharedValue,
  useDerivedValue,
  interpolate,
  Extrapolation,
  useAnimatedScrollHandler,
  useAnimatedReaction,
  runOnJS
} from 'react-native-reanimated'
import { type ArmyRosterBackgroundAnimationObject } from './types'
import { useMemoizedFn } from 'ahooks'
import * as Haptics from 'expo-haptics'

const useArmyRosterBackgroundAnimation =
  (): ArmyRosterBackgroundAnimationObject => {
    const scrollValue = useSharedValue(0)
    const scale = useDerivedValue(() =>
      interpolate(scrollValue.value, [0, -200], [1, 1.2], Extrapolation.CLAMP)
    )

    const onScroll = useAnimatedScrollHandler({
      onScroll: (event) => {
        scrollValue.value = event.contentOffset.y
      }
    })

    const impact = useMemoizedFn((style: Haptics.ImpactFeedbackStyle) => {
      Haptics.impactAsync(style)
    })

    useAnimatedReaction(
      () => scrollValue.value,
      (curr, prev) => {
        if (curr === 200) {
          runOnJS(impact)(Haptics.ImpactFeedbackStyle.Medium)
          return
        }
        if (curr < (prev ?? 0) && prev === 200) {
          runOnJS(impact)(Haptics.ImpactFeedbackStyle.Medium)
        }
      }
    )

    return useMemo(
      () => ({
        onScroll,
        scale,
        scrollValue
      }),
      [onScroll, scale, scrollValue]
    )
  }

export default useArmyRosterBackgroundAnimation
