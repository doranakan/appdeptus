import { type Army } from 'appdeptus/models'
import { type ComponentProps, memo } from 'react'
import {
  GestureDetector,
  useNativeGesture,
  usePanGesture,
  useSimultaneousGestures
} from 'react-native-gesture-handler'
import Animated, {
  cancelAnimation,
  scrollTo,
  useAnimatedRef,
  useAnimatedReaction,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated'
import { VStack } from '../ui'
import { UnitListItem } from '../UnitListItem'
import { scheduleOnRN } from 'react-native-worklets'
import * as Haptics from 'expo-haptics'

type ArmyRosterProps = {
  roster: Army['roster']
  ListHeaderComponent?: ComponentProps<
    typeof Animated.FlatList
  >['ListHeaderComponent']
  invalidUnits?: Army['roster'][number]['id'][]
  onOverScroll?: (onOverScroll: number) => void
}

const SNAP_THRESHOLD = 100
const EXPANDED_TRANSLATION = 250

const ArmyRoster = ({
  roster,
  ListHeaderComponent,
  invalidUnits = [],
  onOverScroll
}: ArmyRosterProps) => {
  const scrollRef = useAnimatedRef<Animated.FlatList>()
  const isOnTop = useSharedValue(true)
  const translation = useSharedValue(0)

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { y } }) => {
      if (translation.value > 0) {
        if (y !== 0) {
          scrollTo(scrollRef, 0, 0, false)
        }
        isOnTop.value = true
        return
      }
      isOnTop.value = y <= 0
    }
  })

  const nativeGesture = useNativeGesture()
  const panGesture = usePanGesture({
    onUpdate: ({ changeY }) => {
      cancelAnimation(translation)

      const extending = isOnTop.value && changeY > 0
      const collapsing = translation.value > 0 && changeY < 0
      if (!extending && !collapsing) {
        return
      }
      scrollTo(scrollRef, 0, 0, false)
      translation.value = Math.max(0, translation.value + changeY)
    },
    onDeactivate: () => {
      translation.value = withSpring(
        translation.value >= SNAP_THRESHOLD ? EXPANDED_TRANSLATION : 0
      )
    }
  })
  const gesture = useSimultaneousGestures(nativeGesture, panGesture)

  useAnimatedReaction(
    () => translation.value >= SNAP_THRESHOLD,
    (crossed, prev) => {
      if (crossed && prev === false) {
        scheduleOnRN(Haptics.impactAsync, Haptics.ImpactFeedbackStyle.Rigid)
      }
    }
  )

  useAnimatedReaction(
    () => translation.value,
    (curr) => {
      onOverScroll?.(curr)
    }
  )
  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translation.value }]
  }))

  return (
    <GestureDetector gesture={gesture}>
      <Animated.FlatList
        style={rStyle}
        onScroll={onScroll}
        ref={scrollRef}
        data={roster}
        contentContainerClassName='pt-32'
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <VStack className='h-4' />}
        keyExtractor={(unit) => {
          switch (unit.type) {
            case 'embarked':
            case 'team':
              return unit.id
            default:
              return unit.selectionId
          }
        }}
        ListFooterComponent={() => <VStack className='h-4' />}
        ListHeaderComponent={ListHeaderComponent}
        renderItem={({ item }) => (
          <UnitListItem
            item={item}
            isValid={
              item.type === 'team' ||
              item.type === 'embarked' ||
              ('selectionId' in item &&
                !invalidUnits.includes(item.selectionId))
            }
          />
        )}
      />
    </GestureDetector>
  )
}

export default memo(ArmyRoster)
