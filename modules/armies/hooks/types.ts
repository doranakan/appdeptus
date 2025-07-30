import { type MutableRefObject } from 'react'
import { type PanGesture } from 'react-native-gesture-handler'
import {
  type SharedValue,
  type ScrollHandlerProcessed
} from 'react-native-reanimated'

type ArmyRosterBackgroundAnimationObject = {
  onScroll: ScrollHandlerProcessed
  opacity: SharedValue<number>
  panGesture?: PanGesture
  panGestureRef?: MutableRefObject<PanGesture | undefined>
  panScrollValue?: SharedValue<number>
  scrollValue: SharedValue<number>
  scale: SharedValue<number>
}

export type { ArmyRosterBackgroundAnimationObject }
