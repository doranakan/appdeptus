import {
  Button,
  ButtonGroup,
  Card,
  HStack,
  Text,
  VStack
} from 'appdeptus/components'
import { type UserProfile } from 'appdeptus/models'
import { type ActiveGame } from 'appdeptus/models/game'
import { debounce } from 'lodash'
import { Minus, Plus } from 'lucide-react-native'
import { memo, useCallback, useMemo, useState } from 'react'
import { useUpdateScoreAndCPMutation } from '../../api'

type CommandsProps = {
  game: ActiveGame
  user: UserProfile
}

const Commands = ({ game, user }: CommandsProps) => {
  const [updateScoreOrCP] = useUpdateScoreAndCPMutation()

  const updateScore = useCallback(
    async (value: number) =>
      await updateScoreOrCP({
        gameId: game.id,
        pOneCP: game.playerOne.cp,
        pOneScore:
          user.id === game.playerOne.profile.id ? value : game.playerOne.score,
        pTwoCP: game.playerTwo.cp,
        pTwoScore:
          user.id === game.playerTwo.profile.id ? value : game.playerTwo.score
      }),
    [
      game.id,
      game.playerOne.cp,
      game.playerOne.profile.id,
      game.playerOne.score,
      game.playerTwo.cp,
      game.playerTwo.profile.id,
      game.playerTwo.score,
      updateScoreOrCP,
      user.id
    ]
  )

  const debouncedUpdateScore = useMemo(
    () => debounce(updateScore, 500),
    [updateScore]
  )

  const updateCP = useCallback(
    async (value: number) =>
      await updateScoreOrCP({
        gameId: game.id,
        pOneCP:
          user.id === game.playerOne.profile.id ? value : game.playerOne.cp,
        pOneScore: game.playerOne.score,
        pTwoCP:
          user.id === game.playerTwo.profile.id ? value : game.playerTwo.cp,
        pTwoScore: game.playerTwo.score
      }),
    [
      game.id,
      game.playerOne.cp,
      game.playerOne.profile.id,
      game.playerOne.score,
      game.playerTwo.cp,
      game.playerTwo.profile.id,
      game.playerTwo.score,
      updateScoreOrCP,
      user.id
    ]
  )

  const debouncedUpdateCP = useMemo(() => debounce(updateCP, 500), [updateCP])

  return (
    <VStack space='md'>
      <Command
        onPress={debouncedUpdateScore}
        text='Victory points'
        value={
          user.id === game.playerOne.profile.id
            ? game.playerOne.score
            : game.playerTwo.score
        }
      />
      <Command
        onPress={debouncedUpdateCP}
        text='Command points'
        value={
          user.id === game.playerOne.profile.id
            ? game.playerOne.cp
            : game.playerTwo.cp
        }
      />
    </VStack>
  )
}

type CommandProps = {
  onPress: (value: number) => void
  text: string
  value: number
}

const Command = ({ onPress, text, value }: CommandProps) => {
  const [points, setPoints] = useState(value)

  return (
    <Card>
      <HStack className='items-center justify-between p-4'>
        <HStack space='sm'>
          <Text family='body-bold'>{points}</Text>
          <Text>{text}</Text>
        </HStack>
        <ButtonGroup>
          <Button
            size='sm'
            disabled={points === 100}
            color='primary'
            onPress={() => {
              setPoints(points + 1)
              onPress(points + 1)
            }}
            variant='callback'
            icon={Plus}
          />
          <Button
            size='sm'
            disabled={points === 0}
            color='primary'
            onPress={() => {
              setPoints(points - 1)
              onPress(points - 1)
            }}
            variant='callback'
            icon={Minus}
          />
        </ButtonGroup>
      </HStack>
    </Card>
  )
}

export default memo(Commands)
