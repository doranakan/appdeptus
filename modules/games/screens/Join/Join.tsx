import { skipToken } from '@reduxjs/toolkit/query'
import { useUnmount } from 'ahooks'
import {
  ArmyListItem,
  Loading,
  NavigationHeader,
  Pressable,
  resetTheme,
  ScreenContainer,
  ScreenSubtitle,
  setTheme,
  VersusBackground,
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
import { GameDetail } from '../../components'

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
    <VStack className='flex-1'>
      <VStack className='absolute h-full w-full bg-primary-950'>
        <VStack className='flex-1'>
          <VersusBackground
            codexOne={game.playerOne.army.codex.name}
            codexTwo={selectedArmy?.codex.name}
            player='two'
          />
        </VStack>
        <VStack className='flex-1' />
      </VStack>
      <ScreenContainer
        className='bg-transparent p-4'
        safeAreaInsets={['bottom', 'top']}
        space='md'
      >
        <NavigationHeader
          variant='backButton'
          rightButton={{
            disabled: !selectedArmy,
            loading: isLoading,
            onPress: async () => {
              if (selectedArmy) {
                const res = await startGame({
                  armyId: selectedArmy.id,
                  gameId: game.id
                })

                if ('error' in res) {
                  return
                }

                router.replace(`games/${game.id}`)
              }
            },
            variant: 'callback',
            icon: Swords
          }}
        />

        <GameDetail
          armyOne={game.playerOne.army}
          armyTwo={selectedArmy}
        />
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
                  !selectedArmy
                    ? 'selectable'
                    : item.id === selectedArmy?.id
                      ? 'selected'
                      : 'selectable-alt'
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
      </ScreenContainer>
    </VStack>
  )
}

export default JoinGameScreen
