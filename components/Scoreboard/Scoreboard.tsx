import { shortCodexNames } from 'appdeptus/constants'
import { type Player } from 'appdeptus/models/game'
import clsx from 'clsx'
import { memo } from 'react'
import Text from '../Text'
import { HStack } from '../ui'

type ScoreboardProps = {
  playerOne: Player
  playerTwo: Player

  final?: boolean
}

const Scoreboard = ({ playerOne, playerTwo, final }: ScoreboardProps) => (
  <HStack className='w-full items-center justify-between'>
    <Text
      size='3xl'
      className='uppercase'
      family='body-bold'
    >
      {shortCodexNames[playerOne.army.codex.name]}
    </Text>
    <HStack space='md'>
      <Text
        className={clsx(
          final && playerOne.score < playerTwo.score && 'opacity-70'
        )}
        family='heading-regular'
        size='4xl'
      >
        {playerOne.score}
      </Text>
      <Text
        family='heading-regular'
        size='4xl'
      >
        -
      </Text>
      <Text
        className={clsx(
          final && playerOne.score > playerTwo.score && 'opacity-70'
        )}
        family='heading-regular'
        size='4xl'
      >
        {playerTwo.score}
      </Text>
    </HStack>
    <Text
      size='3xl'
      className='uppercase'
      family='body-bold'
    >
      {shortCodexNames[playerTwo.army.codex.name]}
    </Text>
  </HStack>
)

export default memo(Scoreboard)
