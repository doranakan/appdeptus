import { type Army } from 'appdeptus/models'
import React, { type ComponentProps, createRef, memo } from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native'
import { themeColors, VStack } from '../ui'
import { UnitListItem } from '../UnitListItem'
import {
  Gesture,
  GestureDetector,
  ScrollView,
  type FlatList
} from 'react-native-gesture-handler'
import Animated, {
  makeMutable,
  runOnJS,
  useAnimatedRef,
  useAnimatedStyle
} from 'react-native-reanimated'
import ArmyBackground from '../ArmyBackground'
import { LinearGradient } from 'expo-linear-gradient'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useArmyRosterBackgroundAnimation } from 'appdeptus/modules/armies/hooks'

type ArmyRosterProps = {
  roster: Army['roster']
  ListHeaderComponent?: ComponentProps<typeof FlatList>['ListHeaderComponent']
  codexName: Army['codex']['name']
  invalidUnits?: Army['roster'][number]['id'][]
}

const ArmyRoster = ({
  roster,
  codexName,
  ListHeaderComponent,
  invalidUnits = []
}: ArmyRosterProps) => {
  const { width: screenWidth } = useWindowDimensions()
  const { top: topInset } = useSafeAreaInsets()

  const {
    onScroll,
    opacity,
    scale,
    scrollValue,
    panGesture,
    panGestureRef,
    panScrollValue
  } = useArmyRosterBackgroundAnimation()

  const pan = panScrollValue ?? makeMutable(0)

  const rFlatListStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: pan.value }]
  }))

  const rBgStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }]
  }))

  const flatListRef = useAnimatedRef<Animated.FlatList<typeof roster>>()
  const revealArtwork = (offset: number) =>
    flatListRef.current?.scrollToOffset({
      offset,
      animated: true
    })

  const onScrollEnd = () => {
    'worklet'
    if (scrollValue.value > 0) {
      return
    }
    if (scrollValue.value > -100) {
      runOnJS(revealArtwork)(0)
      return
    }
    runOnJS(revealArtwork)(-200)
  }

  return (
    <>
      <VStack
        className='absolute -z-10 h-full'
        style={{ width: screenWidth, top: -topInset }}
      >
        <VStack className='flex-1'>
          <ArmyBackground
            codex={codexName}
            scale={scale}
          />
          <Animated.View
            className='flex-1'
            style={rBgStyle}
          >
            <LinearGradient
              colors={[
                `${themeColors[codexName].primary[950]}00`,
                themeColors[codexName].primary[950]
              ]}
              style={styles.gradient}
            />
          </Animated.View>
        </VStack>
        <VStack className='flex-1' />
      </VStack>
      <GestureDetector gesture={panGesture ?? Gesture.Pan().enabled(false)}>
        <Animated.FlatList
          ref={flatListRef}
          onScroll={onScroll}
          onScrollEndDrag={onScrollEnd}
          scrollEventThrottle={16}
          data={roster}
          style={rFlatListStyle}
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
              simultaneousHandlers={[panGestureRef ?? createRef()]}
            />
          )}
          overScrollMode='never'
          scrollToOverflowEnabled
        />
      </GestureDetector>
    </>
  )
}

const styles = StyleSheet.create({
  gradient: {
    height: '100%',
    width: '100%'
  }
})

export default memo(ArmyRoster)
