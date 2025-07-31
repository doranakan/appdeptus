import { useMemo, useRef } from 'react'
import { type PanGesture, Gesture } from 'react-native-gesture-handler'
import {
  clamp,
  useSharedValue,
  useDerivedValue,
  interpolate,
  Extrapolation,
  useAnimatedScrollHandler,
  withSpring
} from 'react-native-reanimated'
import { type ArmyRosterBackgroundAnimationObject } from './types'

const useArmyRosterBackgroundAnimation =
  (): ArmyRosterBackgroundAnimationObject => {
    const scrollValue = useSharedValue(0)
    const panScrollValue = useSharedValue(0)
    const scale = useDerivedValue(() =>
      interpolate(panScrollValue.value, [0, 200], [1, 1.2], Extrapolation.CLAMP)
    )
    const opacity = useDerivedValue(() =>
      interpolate(panScrollValue.value, [0, 200], [1, 0.8], Extrapolation.CLAMP)
    )

    const onScroll = useAnimatedScrollHandler({
      onScroll: (event) => {
        scrollValue.value = event.contentOffset.y
      }
    })
    const panGestureRef = useRef<PanGesture>()

    const panGesture = useMemo(
      () =>
        Gesture.Pan()
          .withRef(panGestureRef)
          .onChange(({ changeY }) => {
            if (scrollValue.value <= 0 || panScrollValue.value > 0) {
              panScrollValue.value = clamp(
                panScrollValue.value + changeY,
                0,
                200
              )
            }
          })
          .onFinalize(() => {
            if (panScrollValue.value > 100) {
              panScrollValue.value = withSpring(200)
            } else {
              panScrollValue.value = withSpring(0)
            }
          }),
      [panScrollValue, scrollValue.value]
    )

    return useMemo(
      () => ({
        onScroll,
        opacity,
        panGesture,
        panGestureRef,
        scrollValue,
        scale,
        panScrollValue
      }),
      [onScroll, opacity, panGesture, panScrollValue, scale, scrollValue]
    )
  }

export default useArmyRosterBackgroundAnimation
