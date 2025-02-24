import { useBoolean, usePrevious } from 'ahooks'
import { type Codex } from 'appdeptus/models'
import { useEffect, useMemo, useState } from 'react'
import { ActivityIndicator, Platform, type View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withTiming
} from 'react-native-reanimated'
import StackedListItem from './StackedListItem'
import { ITEM_HEIGHT, STACK_OFFSET } from './constants'
import { themeColors, VStack } from '../ui'

type StackedListProps = {
  data: Codex[]
  onItemPress: (codex: Codex) => void
  selectedCodex: Codex['name']
  isLoading: boolean
  onPullToRefresh: () => void
}

const StackedList = ({
  data,
  onItemPress,
  selectedCodex,
  isLoading,
  onPullToRefresh
}: StackedListProps) => {
  const scrollY = useSharedValue(0)
  const selectedIndex = useSharedValue<number | null>(null)
  const pullToRefreshOffset = useSharedValue(0)

  const wasLoading = usePrevious(isLoading)

  useEffect(() => {
    if (!isLoading && wasLoading) {
      pullToRefreshOffset.value = withTiming(0, { duration: 200 })
    }
  }, [isLoading, pullToRefreshOffset, wasLoading])

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

  useEffect(() => {
    if (!selectedCodex) {
      selectedIndex.value = null
      scrollY.value = withTiming(0)
    }
  }, [scrollY, selectedCodex, selectedIndex])

  const [containerHeight, setContainerHeight] = useState(0)

  const containerRef = useAnimatedRef<View>()

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .enabled(panEnabled)
        .onChange(({ changeY }) => {
          scrollY.value += changeY
          if (scrollY.value > 0) {
            pullToRefreshOffset.value += changeY
          }
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
            rubberBandFactor: 1
          })
          if (pullToRefreshOffset.value > 80) {
            pullToRefreshOffset.value = withTiming(
              120,
              { duration: 200 },
              () => {
                runOnJS(onPullToRefresh)()
              }
            )
          } else {
            pullToRefreshOffset.value = withTiming(0, { duration: 200 })
          }
        }),
    [
      containerHeight,
      data.length,
      onPullToRefresh,
      panEnabled,
      pullToRefreshOffset,
      scrollY
    ]
  )

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: scrollY.value }]
  }))
  const rIndicatorStyle = useAnimatedStyle(() => ({
    height: 120,
    transform: [
      {
        translateY: interpolate(
          pullToRefreshOffset.value,
          [0, 120],
          [-120, 0],
          Extrapolation.CLAMP
        )
      }
    ]
  }))
  const rSpacerStyle = useAnimatedStyle(() => ({
    height: pullToRefreshOffset.value
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
        <Animated.View
          className='absolute top-0 z-10 w-full items-center justify-center'
          style={rIndicatorStyle}
        >
          <ActivityIndicator
            color={themeColors.default.primary[300]}
            size='large'
          />
        </Animated.View>
        {Platform.OS === 'ios' ? <Animated.View style={rSpacerStyle} /> : null}
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
