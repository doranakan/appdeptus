import { useMemo, useRef } from 'react'
import { type PanGesture, Gesture } from 'react-native-gesture-handler'
import {
  clamp,
  useSharedValue,
  useDerivedValue,
  interpolate,
  Extrapolation,
  useAnimatedScrollHandler,
  withSpring,
  runOnJS,
  useAnimatedReaction
} from 'react-native-reanimated'
import { type ArmyRosterBackgroundAnimationObject } from './types'
import * as Haptics from 'expo-haptics'
import { useMemoizedFn } from 'ahooks'

const useArmyRosterBackgroundAnimation =
  (): ArmyRosterBackgroundAnimationObject => {
    const scrollValue = useSharedValue(0)
    const panScrollValue = useSharedValue(0)
    const scale = useDerivedValue(() =>
      interpolate(panScrollValue.value, [0, 200], [1, 1.2], Extrapolation.CLAMP)
    )

    const onScroll = useAnimatedScrollHandler({
      onScroll: (event) => {
        scrollValue.value = event.contentOffset.y
      }
    })
    const panGestureRef = useRef<PanGesture>()
    const impact = useMemoizedFn((style: Haptics.ImpactFeedbackStyle) => {
      Haptics.impactAsync(style)
    })

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
              panScrollValue.value = withSpring(200, {
                stiffness: 150,
                damping: 25
              })
            } else {
              panScrollValue.value = withSpring(0, {
                stiffness: 150,
                damping: 25
              })
            }
          }),
      [panScrollValue, scrollValue.value]
    )
    useAnimatedReaction(
      () => panScrollValue.value,
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
        panGesture,
        panGestureRef,
        scrollValue,
        scale,
        panScrollValue
      }),
      [onScroll, panGesture, panScrollValue, scale, scrollValue]
    )
  }

export default useArmyRosterBackgroundAnimation
