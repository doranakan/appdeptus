import { type GameArmy } from 'appdeptus/models'
import React, { type ComponentProps, memo } from 'react'
import { FlatList } from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { selectThemeName } from '../store'
import { Pressable, themeColors, VStack } from '../ui'
import { GameUnitListItem } from '../UnitListItem'

type GameArmyRosterProps = {
  roster: GameArmy['roster']

  ListHeaderComponent?: ComponentProps<typeof FlatList>['ListHeaderComponent']
  onPressItem?: (roster: GameArmy['roster'][number]) => void
  onRefresh?: () => void
  refreshing?: boolean
}

const GameArmyRoster = ({
  roster,

  ListHeaderComponent,
  onPressItem,
  onRefresh,
  refreshing
}: GameArmyRosterProps) => {
  const themeName = useSelector(selectThemeName)

  return (
    <>
      <FlatList
        data={roster}
        onRefresh={onRefresh}
        refreshing={refreshing ?? false}
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={refreshing ?? false}
              tintColor={themeColors[themeName].tertiary[600]}
            />
          ) : undefined
        }
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
          <Pressable
            onPress={() => {
              onPressItem?.(item)
            }}
          >
            <GameUnitListItem item={item} />
          </Pressable>
        )}
      />
    </>
  )
}

export default memo(GameArmyRoster)
