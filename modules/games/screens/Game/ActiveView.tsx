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
import { ArrowBigRightDash } from 'lucide-react-native'
import { useCallback, useState } from 'react'
import {
  useEndGameMutation,
  useGameArmyUpdates,
  useGameUpdates,
  useNextTurnMutation,
  useUpdateGameArmyMutation
} from '../../api'
import { Background } from '../../components'
import Commands from './Commands'
import GameDetail from './GameDetail'
import ModelBottomSheet from './ModelBottomSheet'
import ref from './ref'

type ActiveViewProps = {
  game: ActiveGame
  user: UserProfile
}

const ActiveView = ({ game, user }: ActiveViewProps) => {
  const [selectedUnit, setSelectedUnit] = useState<GameArmy['roster'][number]>()

  useGameUpdates(game.id)
  useGameArmyUpdates(game)

  const [nextTurn, { isLoading: isMovingToNextTurn }] = useNextTurnMutation()
  const [endGame, { isLoading: isGameEnding }] = useEndGameMutation()

  const dispatch = useAppDispatch()

  const [selectedPlayer, setSelectedPlayer] = useState<'One' | 'Two'>('One')

  const advanceTurnOrComplete = useCallback(async () => {
    if (game.status !== 'turn5_p2') {
      return await nextTurn({
        currentStatus: game.status,
        gameId: game.id
      })
    }

    return await endGame(game.id)
  }, [endGame, game.id, game.status, nextTurn])

  const handlePressedItem = useCallback((item: GameArmy['roster'][number]) => {
    setSelectedUnit(item)
    ref.current?.present()
  }, [])

  const { show } = useToast()

  const [updateArmy] = useUpdateGameArmyMutation()

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
            currentStep: turnToStep[game.status],
            steps: 10,
            text: turnName[game.status]
          }}
          rightButton={{
            disabled: isMovingToNextTurn || isGameEnding,
            onPress: advanceTurnOrComplete,
            variant: 'callback',
            loading: isMovingToNextTurn || isGameEnding,
            icon: ArrowBigRightDash
          }}
        />
        <Scoreboard {...game} />
        <GameArmyRoster
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
    </VStack>
  )
}

const turnName = {
  turn1_p1: 'Attacker - Turn 1',
  turn1_p2: 'Defender - Turn 1',
  turn2_p1: 'Attacker - Turn 2',
  turn2_p2: 'Defender - Turn 2',
  turn3_p1: 'Attacker - Turn 3',
  turn3_p2: 'Defender - Turn 3',
  turn4_p1: 'Attacker - Turn 4',
  turn4_p2: 'Defender - Turn 4',
  turn5_p1: 'Attacker - Turn 5',
  turn5_p2: 'Defender - Turn 5'
} as const satisfies Record<ActiveGame['status'], string>

const turnToStep = {
  turn1_p1: 1,
  turn1_p2: 2,
  turn2_p1: 3,
  turn2_p2: 4,
  turn3_p1: 5,
  turn3_p2: 6,
  turn4_p1: 7,
  turn4_p2: 8,
  turn5_p1: 9,
  turn5_p2: 10
} as const satisfies Record<ActiveGame['status'], number>

export default ActiveView
