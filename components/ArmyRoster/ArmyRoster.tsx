import { type Army } from 'appdeptus/models'
import React, {
  type ComponentProps,
  type ForwardedRef,
  forwardRef,
  memo
} from 'react'
import { VStack } from '../ui'
import { UnitListItem } from '../UnitListItem'
import Animated from 'react-native-reanimated'
import { type FlatList } from 'react-native'

type ArmyRosterProps = Partial<
  Omit<ComponentProps<typeof Animated.FlatList<Army['roster'][number]>>, 'data'>
> & {
  roster: Army['roster']
  invalidUnits?: Army['roster'][number]['id'][]
}

const ArmyRoster = (
  {
    roster,
    ListHeaderComponent,
    invalidUnits = [],
    ...flatListProps
  }: ArmyRosterProps,
  ref: ForwardedRef<FlatList<Army['roster'][number]>>
) => (
  <Animated.FlatList
    {...flatListProps}
    ref={ref}
    scrollEventThrottle={16}
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
          ('selectionId' in item && !invalidUnits.includes(item.selectionId))
        }
      />
    )}
  />
)

export default memo(forwardRef(ArmyRoster))
