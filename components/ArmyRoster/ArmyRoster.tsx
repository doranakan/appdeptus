import { type Army } from 'appdeptus/models'
import React, { type ComponentProps, memo, useMemo } from 'react'
import { FlatList } from 'react-native'
import { VStack } from '../ui'
import UnitListItem from '../UnitListItem'

type UnitRosterProps = {
  composition: Army['composition']
  ListHeaderComponent?: ComponentProps<typeof FlatList>['ListHeaderComponent']
}

const UnitRoster = ({ composition, ListHeaderComponent }: UnitRosterProps) => {
  const units = useMemo(() => {
    const { characters, leaders, squads, teams, transports, vehicles } =
      composition

    return [
      ...teams,
      ...characters,
      ...leaders,
      ...squads,
      ...transports,
      ...vehicles
    ]
  }, [composition])

  return (
    <FlatList
      data={units}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <VStack className='h-4' />}
      keyExtractor={(unit) => {
        if (unit.type !== 'team') {
          return unit.selectionId
        }
        return unit.id
      }}
      ListFooterComponent={() => <VStack className='h-4' />}
      ListHeaderComponent={ListHeaderComponent}
      renderItem={({ item, index }) => (
        <UnitListItem
          unitOrTeam={item}
          warlord={index === 0}
        />
      )}
    />
  )
}

export default memo(UnitRoster)
