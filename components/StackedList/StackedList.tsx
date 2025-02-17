import { useBoolean } from 'ahooks'
import { type Codex } from 'appdeptus/models'
import { useMemo, useState } from 'react'
import { type View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withDecay
} from 'react-native-reanimated'
import StackedListItem from './StackedListItem'
import { ITEM_HEIGHT, STACK_OFFSET } from './constants'
import { VStack } from '../ui'

type StackedListProps = {
  data: Codex[]
  onItemPress: (codex: Codex) => void
  selectedCodex: Codex['name']
}

const StackedList = ({
  data,
  onItemPress,
  selectedCodex
}: StackedListProps) => {
  const scrollY = useSharedValue(0)
  const selectedIndex = useSharedValue<number | null>(null)

  const [panEnabled, { setTrue: enablePan, setFalse: disablePan }] =
    useBoolean(true)

  useAnimatedReaction(
    () => selectedIndex.value,
    (curr) => {
      if (curr === null) {
        runOnJS(enablePan)()
      } else {
        runOnJS(disablePan)()
      }
    }
  )

  const [containerHeight, setContainerHeight] = useState(0)

  const containerRef = useAnimatedRef<View>()

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .enabled(panEnabled)
        .onChange(({ changeY }) => {
          scrollY.value += changeY
        })
        .onEnd(({ velocityY }) => {
          scrollY.value = withDecay({
            velocity: velocityY,
            clamp: [
              -data.length * (ITEM_HEIGHT - STACK_OFFSET) +
                containerHeight -
                STACK_OFFSET,
              0
            ],
            rubberBandEffect: true,
            rubberBandFactor: 1.5
          })
        }),
    [containerHeight, data.length, panEnabled, scrollY]
  )

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: scrollY.value }]
  }))

  return (
    <GestureDetector gesture={panGesture}>
      <VStack
        className='flex-1 overflow-hidden'
        ref={containerRef}
        onLayout={(event) => {
          event.target.measure((_x, _y, _w, height) => {
            setContainerHeight(height)
          })
        }}
      >
        <Animated.View style={rStyle}>
          {data.map((codex, index) => (
            <StackedListItem
              scrollY={scrollY}
              key={String(codex.id)}
              index={index}
              item={codex}
              onPress={onItemPress}
              selectedIndex={selectedIndex}
              selected={codex.name === selectedCodex}
            />
          ))}
        </Animated.View>
      </VStack>
    </GestureDetector>
  )
}

export default StackedList
