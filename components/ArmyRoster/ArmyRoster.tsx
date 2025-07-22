import { type Army } from 'appdeptus/models'
import React, { type ComponentProps, memo, useRef } from 'react'
import { VStack } from '../ui'
import { UnitListItem } from '../UnitListItem'
import {
  type FlatList,
  Gesture,
  GestureDetector,
  type PanGesture,
  ScrollView
} from 'react-native-gesture-handler'
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDecay
} from 'react-native-reanimated'

type ArmyRosterProps = {
  roster: Army['roster']
  ListHeaderComponent?: ComponentProps<typeof FlatList>['ListHeaderComponent']
  invalidUnits?: Army['roster'][number]['id'][]
}

const ArmyRoster = ({
  roster,
  ListHeaderComponent,
  invalidUnits = []
}: ArmyRosterProps) => {
  const panRef = useRef<PanGesture>()

  const scrollValue = useSharedValue(0)
  const scale = useDerivedValue(() =>
    interpolate(scrollValue.value, [0, 200], [0.5, 1.2], Extrapolation.CLAMP)
  )

  const pan = Gesture.Pan()
    .withRef(panRef)
    .onUpdate(({ translationY }) => {
      scrollValue.value += translationY
    })
    .onFinalize(({ velocityY }) => {
      scrollValue.value = withDecay({
        velocity: velocityY,
        clamp: [-1000, 200]
      })
    })

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }))

  return (
    <>
      <Animated.View
        className='absolute top-28 h-52 w-full bg-slate-100'
        style={rStyle}
      />
      <GestureDetector gesture={pan}>
        <Animated.FlatList
          data={roster}
          className='border-2 border-yellow-500'
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
          renderScrollComponent={(props) => (
            <ScrollView
              {...props}
              simultaneousHandlers={[panRef]}
            />
          )}
        />
      </GestureDetector>
    </>
  )
}

export default memo(ArmyRoster)
