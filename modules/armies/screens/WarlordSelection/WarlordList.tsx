import { Card, Pressable, UnitName, VStack } from 'appdeptus/components'
import { type ArmyBuilder, type Character, type Leader } from 'appdeptus/models'
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

  const units = watch('units')

  return (
    <FlatList
      data={potentialWarlords}
      keyExtractor={({ selectionId }) => selectionId}
      ItemSeparatorComponent={() => <VStack className='h-4' />}
      ListFooterComponent={() => <VStack className='h-4' />}
      renderItem={({ item }) => (
        <Pressable
          disabled={item.warlord}
          onPress={() => {
            setValue(
              'units',
              units.map((unit) => {
                if (unit.id !== item.id) {
                  return unit
                }

                return { ...unit, warlord: true }
              })
            )
          }}
        >
          <Card variant={item.warlord ? 'selected' : 'selectable'}>
            <VStack className='p-4'>
              <UnitName
                name={item.name}
                type={item.type}
                warlord={item.warlord}
              />
            </VStack>
          </Card>
        </Pressable>
      )}
    />
  )
}

export default memo(WarlordList)
