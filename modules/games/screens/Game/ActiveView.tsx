import { useMount } from 'ahooks'
import {
  GameArmyRoster,
  NavigationHeader,
  Scoreboard,
  ScreenContainer,
  setTheme,
  TabMenu,
  useToast,
  VStack
} from 'appdeptus/components'
import { type GameArmy, type UserProfile } from 'appdeptus/models'
import { type ActiveGame } from 'appdeptus/models/game'
import { useAppDispatch } from 'appdeptus/store'
import { EllipsisVertical } from 'lucide-react-native'
import { useCallback, useState } from 'react'
import {
  useGameArmyUpdates,
  useGameUpdates,
  useGetGameQuery,
  useUpdateGameArmyMutation
} from '../../api'
import { Background } from '../../components'
import Commands from './Commands'
import GameBottomSheet from './GameBottomSheet'
import GameDetail from './GameDetail'
import ModelBottomSheet from './ModelBottomSheet'
import { gameRef, modelRef } from './refs'
import useCurrentPlayer from './useCurrentPlayer'

type ActiveViewProps = {
  game: ActiveGame
  user: UserProfile
}

const ActiveView = ({ game, user }: ActiveViewProps) => {
  const { isLoading, refetch } = useGetGameQuery(game.id)

  useGameUpdates(game.id)
  useGameArmyUpdates(game)

  const currentPlayer = useCurrentPlayer(game)

  const [selectedUnit, setSelectedUnit] = useState<GameArmy['roster'][number]>(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    game.playerOne.army.roster[0]!
  )
  const handlePressedItem = useCallback((item: GameArmy['roster'][number]) => {
    setSelectedUnit(item)
    modelRef.current?.present()
  }, [])

  const { show } = useToast()

  const [updateArmy] = useUpdateGameArmyMutation()
  const [selectedPlayer, setSelectedPlayer] = useState<'One' | 'Two'>('One')
  const handleArmyUpdate = useCallback(
    async (unit: GameArmy['roster'][number]) => {
      const roster = game[`player${selectedPlayer}`].army.roster.map((u) => {
        switch (unit.type) {
          case 'embarked':
          case 'team': {
            if (unit.id === u.id) {
              return unit
            }
            return u
          }

          default: {
            if (
              u.type !== 'embarked' &&
              u.type !== 'team' &&
              unit.selectionId === u.selectionId
            ) {
              return unit
            }
            return u
          }
        }
      })

      const res = await updateArmy({
        gameId: game.id,
        id: game[`player${selectedPlayer}`].army.id,
        roster
      })

      if ('error' in res) {
        show({ title: '⚠️ error', description: String(res.error) })
      }
    },
    [game, selectedPlayer, show, updateArmy]
  )

  const dispatch = useAppDispatch()
  useMount(() => {
    dispatch(
      setTheme(
        user.id === game.playerOne.profile.id
          ? game.playerOne.army.codex.name
          : game.playerTwo.army.codex.name
      )
    )
  })

  return (
    <VStack className='flex-1 bg-primary-950'>
      <Background
        codexOne={game.playerOne.army.codex.name}
        codexTwo={game.playerTwo.army.codex.name}
      />

      <ScreenContainer
        className='bg-transparent p-4'
        safeAreaInsets={['bottom', 'top']}
        space='md'
      >
        <NavigationHeader
          variant='backButton'
          progress={{
            currentStep: game.turn,
            steps: 10,
            text: `Round ${game.round} - ${currentPlayer.isActive ? 'Your' : "Opponent's"} turn`
          }}
          rightButton={{
            onPress: () => gameRef.current?.present(),
            variant: 'callback',

            icon: EllipsisVertical
          }}
        />
        <Scoreboard {...game} />
        <GameArmyRoster
          onRefresh={refetch}
          refreshing={isLoading}
          ListHeaderComponent={
            <VStack space='md'>
              <GameDetail {...game} />
              <Commands
                game={game}
                user={user}
              />
              <TabMenu
                onOptionSelected={(_, index) => {
                  setSelectedPlayer(index === 0 ? 'One' : 'Two')
                }}
                options={[
                  game.playerOne.army.codex.name,
                  game.playerTwo.army.codex.name
                ]}
              />
              <VStack />
            </VStack>
          }
          roster={
            selectedPlayer === 'One'
              ? game.playerOne.army.roster
              : game.playerTwo.army.roster
          }
          onPressItem={handlePressedItem}
        />
      </ScreenContainer>
      {selectedUnit ? (
        <ModelBottomSheet
          onStatusUpdated={handleArmyUpdate}
          unit={selectedUnit}
          editable={user.id === game[`player${selectedPlayer}`].profile.id}
        />
      ) : null}
      <GameBottomSheet game={game} />
    </VStack>
  )
}

export default ActiveView
