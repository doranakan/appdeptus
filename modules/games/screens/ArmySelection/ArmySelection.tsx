import {
  ArmyListItem,
  Pressable,
  ScreenContainer,
  ScreenSubtitle,
  ScreenTitle,
  setTheme,
  Text,
  VStack
} from 'appdeptus/components'
import { type NewGame } from 'appdeptus/models/game'
import { useGetArmyListQuery } from 'appdeptus/modules/armies/api'
import { useAppDispatch } from 'appdeptus/store'
import { useFormContext } from 'react-hook-form'
import { FlatList } from 'react-native'

const NewGameScreen = () => {
  const { data } = useGetArmyListQuery()

  const dispatch = useAppDispatch()

  const { setValue, watch } = useFormContext<NewGame>()

  const selectedArmy = watch('playerOne.army')

  return (
    <ScreenContainer
      className='bg-primary-950 p-4'
      space='md'
    >
      <ScreenTitle>new game</ScreenTitle>
      <ScreenSubtitle>choose your warhost</ScreenSubtitle>

      <FlatList
        data={data}
        keyExtractor={({ id }) => String(id)}
        ListHeaderComponent={
          <Text
            className='py-4'
            family='body-regular-italic'
          >
            Assemble your forces, warrior of the Imperium. When your army stands
            ready, tap the QR Seal of the Omnissiah in the top right. This
            sacred glyph shall encode your war protocols. Let your opponent scan
            it, and the rites of battle shall commence.
          </Text>
        }
        ItemSeparatorComponent={() => <VStack className='h-4' />}
        ListFooterComponent={() => <VStack className='h-4' />}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              setValue('playerOne.army', item)
              dispatch(setTheme(item.codex.name))
            }}
          >
            <ArmyListItem
              variant={
                !selectedArmy
                  ? 'selectable'
                  : item.id === selectedArmy.id
                    ? 'selected'
                    : 'selectable-alt'
              }
              codex={item.codex.name}
              detachment={item.detachment.name}
              name={item.name}
              points={item.points}
            />
          </Pressable>
        )}
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  )
}

export default NewGameScreen
