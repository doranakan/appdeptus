import { type GameArmy } from 'appdeptus/models'
import { Component } from 'lucide-react-native'
import { type ComponentProps, memo } from 'react'
import { FlatList } from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import Card from '../Card'
import IconBadge from '../IconBadge'
import Text from '../Text'
import { selectThemeName } from '../store'
import { HStack, Pressable, themeColors, VStack } from '../ui'
import { GameUnitListItem } from '../UnitListItem'

type GameArmyRosterProps = {
  army: GameArmy

  ListHeaderComponent?: ComponentProps<typeof FlatList>['ListHeaderComponent']
  onPressItem?: (item: GameArmy['roster'][number]) => void
  onRefresh?: () => void
  refreshing?: boolean
}

const GameArmyRoster = ({
  army,

  ListHeaderComponent,
  onPressItem,
  onRefresh,
  refreshing
}: GameArmyRosterProps) => {
  const themeName = useSelector(selectThemeName)

  const builtInHeader = (
    <VStack space='md'>
      {ListHeaderComponent ? <>{ListHeaderComponent}</> : null}
      <Text
        className='uppercase'
        family='body-bold'
      >
        detachments
      </Text>
      <VStack space='md'>
        {army.detachments.map((detachment) => (
          <Card key={detachment.id}>
            <HStack
              className='items-center justify-between p-4'
              space='md'
            >
              <HStack
                className='flex-1 items-center'
                space='md'
              >
                <IconBadge Icon={Component} />
                <Text
                  className='line-clamp-1 flex-1'
                  family='body-bold'
                >
                  {detachment.name}
                </Text>
              </HStack>
              <Text
                className='uppercase'
                family='body-bold'
                size='sm'
              >{`${detachment.detachmentPoints}dp`}</Text>
            </HStack>
          </Card>
        ))}
      </VStack>
      <Text
        className='uppercase'
        family='body-bold'
      >
        units
      </Text>
      <VStack />
    </VStack>
  )

  return (
    <>
      <FlatList
        data={army.roster}
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
        ListHeaderComponent={builtInHeader}
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
