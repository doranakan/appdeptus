import { useMount } from 'ahooks'
import {
  ArmyRoster,
  NavigationHeader,
  Scoreboard,
  ScreenContainer,
  setTheme,
  TabMenu,
  VersusBackground,
  VStack
} from 'appdeptus/components'
import { type UserProfile } from 'appdeptus/models'
import { type ActiveGame } from 'appdeptus/models/game'
import { ArrowBigRightDash } from 'lucide-react-native'
import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useEndGameMutation, useNextTurnMutation } from '../../api'
import GameDetail from './GameDetail'

type ActiveGameViewProps = {
  game: ActiveGame
  user: UserProfile
}

const ActiveGameView = ({ game, user }: ActiveGameViewProps) => {
  const [nextTurn, { isLoading: isMovingToNextTurn }] = useNextTurnMutation()
  const [endGame, { isLoading: isGameEnding }] = useEndGameMutation()

  const dispatch = useDispatch()

  const [selectedPlayer, setSelectedPlayer] = useState<'one' | 'two'>('one')

  const advanceTurnOrComplete = useCallback(async () => {
    if (game.status !== 'turn5_p2') {
      return await nextTurn({
        currentStatus: game.status,
        gameId: game.id
      })
    }

    return await endGame(game.id)
  }, [endGame, game.id, game.status, nextTurn])

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
      <VStack className='absolute h-full w-full bg-primary-950'>
        <VStack className='flex-1'>
          <VersusBackground
            codexOne={game.playerOne.army.codex.name}
            codexTwo={game.playerTwo.army.codex.name}
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
          progress={{
            currentStep: turnToStep[game.status],
            steps: 10,
            text: turnName[game.status]
          }}
          rightButton={{
            onPress: advanceTurnOrComplete,
            variant: 'callback',
            loading: isMovingToNextTurn || isGameEnding,
            icon: ArrowBigRightDash
          }}
        />
        <Scoreboard {...game} />
        <ArmyRoster
          composition={
            selectedPlayer === 'one'
              ? game.playerOne.army.composition
              : game.playerTwo.army.composition
          }
          ListHeaderComponent={
            <VStack>
              <GameDetail {...game} />
              <VStack className='py-4'>
                <TabMenu
                  onOptionSelected={(_, index) => {
                    setSelectedPlayer(index === 0 ? 'one' : 'two')
                  }}
                  options={[
                    game.playerOne.army.codex.name,
                    game.playerTwo.army.codex.name
                  ]}
                />
              </VStack>
            </VStack>
          }
        />
      </ScreenContainer>
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

export default ActiveGameView
