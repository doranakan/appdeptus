import { StyleSheet } from 'react-native'
import Animated, {
  LinearTransition,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  type SharedValue,
  FadeIn,
  FadeOut,
  withTiming
} from 'react-native-reanimated'
import { COLLAPSED_STACK_OFFSET, ITEM_HEIGHT, STACK_OFFSET } from './constants'
import CodexListItem from 'appdeptus/modules/armies/screens/CodexSelection/CodexListItem'
import { type Codex } from 'appdeptus/models'
import { useCallback } from 'react'
import { useUnmount } from 'ahooks'

type StackedListItemProps = {
  item: Codex
  index: number
  selectedIndex: SharedValue<number | null>
  selected?: boolean
  onPress: (codex: Codex) => void
  scrollY: SharedValue<number>
}

const StackedListItem = ({
  index,
  item,
  selectedIndex,
  selected,
  onPress,
  scrollY
}: StackedListItemProps) => {
  const yOffset = useSharedValue(0)
  const calculateTranslateOffset = useCallback(() => {
    'worklet'
    const elementY = scrollY.value + (ITEM_HEIGHT - STACK_OFFSET) * index
    return -elementY
  }, [index, scrollY])

  useUnmount(() => {
    if (index === selectedIndex.value) {
      scrollY.value = withTiming(0)
      selectedIndex.value = null
    }
  })

  const onItemPress = useCallback(
    (codex: Codex) => {
      onPress(codex)
      if (selectedIndex.value === index) {
        selectedIndex.value = null
      } else {
        selectedIndex.value = index
      }
    },
    [index, onPress, selectedIndex]
  )

  useAnimatedReaction(
    () => selectedIndex.value,
    (curr) => {
      switch (true) {
        case curr === null:
          yOffset.value = withSpring(0)
          break
        case curr === index:
          yOffset.value = withSpring(calculateTranslateOffset())
          break
        default:
          yOffset.value = withSpring(
            calculateTranslateOffset() + 250 + COLLAPSED_STACK_OFFSET * index
          )
      }
    }
  )

  const rItemStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: yOffset.value }]
  }))

  return (
    <Animated.View
      style={[
        styles.itemWrapper,
        { top: (ITEM_HEIGHT - STACK_OFFSET) * index },
        rItemStyle
      ]}
      className='absolute w-full'
      layout={LinearTransition}
      entering={FadeIn}
      exiting={FadeOut}
      collapsable={false}
    >
      <CodexListItem
        codex={item}
        onPress={onItemPress}
        selected={selected}
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  itemWrapper: {
    height: ITEM_HEIGHT
  }
})

export default StackedListItem
