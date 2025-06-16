import {
  GameArmyRoster,
  NavigationHeader,
  Scoreboard,
  ScreenContainer,
  setTheme,
  TabMenu,
  VStack
} from 'appdeptus/components'
import { type EndedGame } from 'appdeptus/models/game'
import { useAppDispatch } from 'appdeptus/store'
import { useEffect, useState } from 'react'
import { Background } from '../../components'
import GameDetail from './GameDetail'

type EndedViewScreenProps = {
  game: EndedGame
}

const EndedViewScreen = ({ game }: EndedViewScreenProps) => {
  const dispatch = useAppDispatch()

  const [selectedPlayer, setSelectedPlayer] = useState<'one' | 'two'>('one')

  useEffect(() => {
    dispatch(
      setTheme(
        game.playerOne.score === game.playerTwo.score
          ? 'default'
          : game.playerOne.score > game.playerTwo.score
            ? game.playerOne.army.codex.name
            : game.playerTwo.army.codex.name
      )
    )
  }, [
    dispatch,
    game.playerOne.army.codex.name,
    game.playerOne.score,
    game.playerTwo.army.codex.name,
    game.playerTwo.score
  ])

  return (
    <VStack className='flex-1 bg-primary-950'>
      <Background
        highlight={
          game.playerOne.score === game.playerTwo.score
            ? 'both'
            : game.playerOne.score > game.playerTwo.score
              ? 'left'
              : 'right'
        }
        codexOne={game.playerOne.army.codex.name}
        codexTwo={game.playerTwo.army.codex.name}
      />
      <ScreenContainer
        className='bg-transparent p-4'
        safeAreaInsets={['bottom', 'top']}
        space='md'
      >
        <NavigationHeader variant='backButton' />
        <Scoreboard
          {...game}
          status='ended'
        />
        <GameArmyRoster
          roster={
            selectedPlayer === 'one'
              ? game.playerOne.army.roster
              : game.playerTwo.army.roster
          }
          ListHeaderComponent={
            <VStack space='md'>
              <GameDetail {...game} />
              <TabMenu
                onOptionSelected={(_, index) => {
                  setSelectedPlayer(index === 0 ? 'one' : 'two')
                }}
                options={[
                  game.playerOne.army.codex.name,
                  game.playerTwo.army.codex.name
                ]}
              />
              <VStack />
            </VStack>
          }
        />
      </ScreenContainer>
    </VStack>
  )
}

export default EndedViewScreen
