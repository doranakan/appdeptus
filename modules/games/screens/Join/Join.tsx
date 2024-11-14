import { skipToken } from '@reduxjs/toolkit/query'
import { useUnmount } from 'ahooks'
import {
  ArmyListItem,
  Loading,
  Pressable,
  resetTheme,
  ScreenContainer,
  ScreenSubtitle,
  setTheme,
  VStack
} from 'appdeptus/components'
import { type Army } from 'appdeptus/models'
import { useGetArmyListQuery } from 'appdeptus/modules/armies/api'
import { router, useLocalSearchParams } from 'expo-router'
import { Swords } from 'lucide-react-native'
import { useState } from 'react'
import { FlatList } from 'react-native'
import { useDispatch } from 'react-redux'
import { useGetNewGameQuery, useStartGameMutation } from '../../api'
import { ArmySelectionTopContainer } from '../../components'

const JoinGameScreen = () => {
  const { gameId } = useLocalSearchParams<{ gameId: string }>()

  const {
    data: game,
    isFetching,
    isError,
    isUninitialized
  } = useGetNewGameQuery(Number(gameId) ?? skipToken)

  const { data: armies } = useGetArmyListQuery()

  const [startGame, { isLoading }] = useStartGameMutation()

  const [selectedArmy, setSelectedArmy] = useState<Army>()

  const dispatch = useDispatch()

  useUnmount(() => dispatch(resetTheme()))

  if (!gameId || isError) {
    return null
  }

  if (isFetching || isUninitialized || !game) {
    return (
      <ScreenContainer className='items-center justify-center'>
        <Loading />
      </ScreenContainer>
    )
  }

  return (
    <ScreenContainer
      safeAreaInsets={['bottom']}
      space='md'
    >
      <ArmySelectionTopContainer
        armyOne={game.playerOne.army}
        armyTwo={selectedArmy}
        player='two'
        rightButton={{
          disabled: !selectedArmy,
          loading: isLoading,
          onPress: async () => {
            if (!selectedArmy) {
              return
            }
            const res = await startGame({
              armyId: selectedArmy.id,
              gameId: Number(gameId)
            })

            if ('error' in res) {
              return
            }

            router.replace(`games/${gameId}`)
          },
          icon: Swords,
          variant: 'callback'
        }}
      />
      <VStack
        className='flex-1 px-4'
        space='md'
      >
        <ScreenSubtitle>choose your warhost</ScreenSubtitle>
        <FlatList
          className='container flex-1'
          data={armies}
          keyExtractor={({ id }) => String(id)}
          ItemSeparatorComponent={() => <VStack className='h-4' />}
          ListFooterComponent={() => <VStack className='h-4' />}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                setSelectedArmy(item)
                dispatch(setTheme(item.codex.name))
              }}
            >
              <ArmyListItem
                variant={
                  item.id === selectedArmy?.id ? 'selected' : 'selectable'
                }
                codex={item.codex.name}
                detachment={item.composition.detachment.name}
                name={item.name}
                points={item.points}
              />
            </Pressable>
          )}
          showsVerticalScrollIndicator={false}
        />
      </VStack>
    </ScreenContainer>
  )
}

export default JoinGameScreen
