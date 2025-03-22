import { useBoolean } from 'ahooks'
import {
  BottomSheet,
  Button,
  ButtonGroup,
  Card,
  HStack,
  OptionButton,
  Text,
  VStack
} from 'appdeptus/components'
import { type ActiveGame } from 'appdeptus/models/game'
import { ArrowRightFromLine, Handshake } from 'lucide-react-native'
import { memo, useCallback } from 'react'
import { useEndGameMutation, useNextTurnMutation } from '../../api'
import { gameRef } from './refs'
import useCurrentPlayer from './useCurrentPlayer'

type GameBottomSheetProps = {
  game: ActiveGame
}

const GameBottomSheet = ({ game }: GameBottomSheetProps) => {
  const [nextTurn, { isLoading: isMovingToNextTurn }] = useNextTurnMutation()
  const [endGame, { isLoading: isGameEnding }] = useEndGameMutation()

  const [endGamePromptVisible, { setFalse: hidePrompt, setTrue: showPrompt }] =
    useBoolean()

  const completeGame = useCallback(async () => {
    await endGame(game.id)
    return gameRef.current?.dismiss()
  }, [endGame, game.id])

  const advanceTurn = useCallback(async () => {
    await nextTurn({
      currentActivePlayer: game.playerOne.isActive ? 'one' : 'two',
      currentTurn: game.turn,
      gameId: game.id
    })
    return gameRef.current?.dismiss()
  }, [game.id, game.playerOne.isActive, game.turn, nextTurn])

  const player = useCurrentPlayer(game)

  return (
    <BottomSheet
      ref={gameRef}
      onPressBackdrop={() => {
        gameRef.current?.dismiss()
        hidePrompt()
      }}
    >
      <VStack space='md'>
        <Text
          className='text-center'
          family='body-bold'
        >
          Manage turn
        </Text>
        <HStack style={{ justifyContent: 'space-evenly' }}>
          <OptionButton
            disabled={isGameEnding || endGamePromptVisible}
            loading={isGameEnding}
            icon={Handshake}
            onPress={showPrompt}
            text='End game'
            variant='callback'
          />
          <OptionButton
            disabled={
              !player.isActive ||
              isMovingToNextTurn ||
              endGamePromptVisible ||
              game.turn === 10
            }
            loading={isMovingToNextTurn}
            icon={ArrowRightFromLine}
            onPress={advanceTurn}
            text='Next turn'
            variant='callback'
          />
        </HStack>
        {endGamePromptVisible ? (
          <Card>
            <HStack
              className='items-center justify-between p-4'
              space='md'
            >
              <HStack className='flex-1'>
                <Text>
                  Once ended a game cannot be reverted, are you sure to end this
                  game?
                </Text>
              </HStack>

              <ButtonGroup>
                <Button
                  onPress={hidePrompt}
                  variant='callback'
                  text='Continue'
                  size='sm'
                />
                <Button
                  onPress={completeGame}
                  variant='callback'
                  text='End game'
                  size='sm'
                  color='secondary'
                />
              </ButtonGroup>
            </HStack>
          </Card>
        ) : null}
      </VStack>
    </BottomSheet>
  )
}

export default memo(GameBottomSheet)
