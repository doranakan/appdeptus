import { useMemo } from 'react'
import {
  useSharedValue,
  useDerivedValue,
  interpolate,
  Extrapolation,
  useAnimatedScrollHandler
} from 'react-native-reanimated'
import { type ArmyRosterBackgroundAnimationObject } from './types'

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
