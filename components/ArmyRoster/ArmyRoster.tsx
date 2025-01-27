import { type Army } from 'appdeptus/models'
import React, { type ComponentProps, memo } from 'react'
import { useWindowDimensions } from 'react-native'
import { VStack } from '../ui'
import { UnitListItem } from '../UnitListItem'
import Animated from 'react-native-reanimated'

type ArmyRosterProps = {
  roster: Army['roster']
  hasPaddingTop?: boolean
} & Pick<
  ComponentProps<typeof Animated.FlatList<Army['roster']>>,
  'onScroll' | 'ListHeaderComponent'
>

const ArmyRoster = ({
  roster,
  ListHeaderComponent,
  onScroll,
  hasPaddingTop = false
}: ArmyRosterProps) => {
  const { height } = useWindowDimensions()
  return (
    <Animated.FlatList
      data={roster}
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
      renderItem={({ item }) => <UnitListItem item={item} />}
      contentContainerStyle={
        hasPaddingTop ? { paddingTop: height * 0.4 } : undefined
      }
      onScroll={onScroll}
    />
  )
}

export default memo(ArmyRoster)
