import { Card, Pressable, UnitName, VStack } from 'appdeptus/components'
import {
  type ArmyBuilder,
  type Character,
  type Leader,
  type Squad
} from 'appdeptus/models'
import { memo, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { FlatList } from 'react-native'

const WarlordList = () => {
  const { setValue, watch } = useFormContext<ArmyBuilder>()

  const potentialWarlords = useMemo(
    () =>
      watch('units').filter<Character | Leader>(
        (unit): unit is Character | Leader =>
          unit.type === 'character' || unit.type === 'leader'
      ),
    [watch]
  )

  const warlord = watch('warlord')

  return (
    <FlatList
      data={potentialWarlords}
      keyExtractor={({ selectionId }) => selectionId}
      ItemSeparatorComponent={() => <VStack className='h-4' />}
      ListFooterComponent={() => <VStack className='h-4' />}
      renderItem={({ item }) => {
        const isWarlord =
          (warlord?.type !== 'team' &&
            item.selectionId === warlord?.selectionId) ||
          (!!item.teamId && item.teamId === warlord?.id)

        return (
          <Pressable
            disabled={item.id === warlord?.id}
            onPress={() => {
              if (
                item.type === 'character' ||
                !('teamId' in item) ||
                !item.teamId
              ) {
                setValue('warlord', item)
                return
              }

              const bodyguard = watch('units').find<Squad>(
                (unit): unit is Squad =>
                  unit.teamId === item.teamId && unit.type === 'squad'
              )

              if (bodyguard) {
                setValue('warlord', {
                  id: item.teamId,
                  bodyguard,
                  leader: item,
                  type: 'team'
                })
              }
            }}
          >
            <Card variant={isWarlord ? 'selected' : 'selectable'}>
              <VStack className='p-4'>
                <UnitName
                  name={item.name}
                  type={item.type}
                  warlord={isWarlord}
                />
              </VStack>
            </Card>
          </Pressable>
        )
      }}
    />
  )
}

export default memo(WarlordList)
