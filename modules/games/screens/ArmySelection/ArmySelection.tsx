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
import { type CreateGame } from 'appdeptus/models/game'
import { useGetArmyListQuery } from 'appdeptus/modules/armies/api'
import { useAppDispatch } from 'appdeptus/store'
import { useFormContext } from 'react-hook-form'
import { FlatList } from 'react-native'

const NewGameScreen = () => {
  const { data } = useGetArmyListQuery()

  const dispatch = useAppDispatch()

  const { setValue, watch } = useFormContext<CreateGame>()

  const selectedArmy = watch('playerOne.army')

  return (
    <ScreenContainer
      className='bg-primary-950 p-4'
      space='md'
    >
      <ScreenTitle>new game</ScreenTitle>
      <ScreenSubtitle>choose your warhost</ScreenSubtitle>
      <Text
        family='body-regular-italic'
        size='sm'
      >
        Commander, select your chosen army from the ranks of your forces and
        follow the prescribed rites of preparation! Only through readiness shall
        victory be forged in the crucible of war.
      </Text>

      <FlatList
        data={data}
        keyExtractor={({ id }) => String(id)}
        ItemSeparatorComponent={() => <VStack className='h-4' />}
        ListFooterComponent={() => <VStack className='h-4' />}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              const { user: _user, ...army } = item
              setValue('playerOne.army', army)
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
