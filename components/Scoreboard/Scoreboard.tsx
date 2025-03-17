import { shortCodexNames } from 'appdeptus/constants'
import {
  type ActiveGame,
  type EndedGame,
  type Player
} from 'appdeptus/models/game'
import clsx from 'clsx'
import { memo } from 'react'
import Text from '../Text'
import { HStack } from '../ui'

type ScoreboardProps = {
  playerOne: Player
  playerTwo: Player
  status: ActiveGame['status'] | EndedGame['status']
}

const Scoreboard = ({ playerOne, playerTwo, status }: ScoreboardProps) => (
  <HStack className='w-full items-center justify-between'>
    <Text
      size='3xl'
      className='uppercase'
      family='body-bold'
    >
      {shortCodexNames[playerOne.army.codex.name]}
    </Text>
    {status === 'in_lobby' ? (
      <Text
        family='heading-regular'
        size='4xl'
      >
        VS
      </Text>
    ) : (
      <HStack space='md'>
        <Text
          className={clsx(
            status === 'ended' &&
              playerOne.score < playerTwo.score &&
              'opacity-70'
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
            status === 'ended' &&
              playerOne.score > playerTwo.score &&
              'opacity-70'
          )}
          family='heading-regular'
          size='4xl'
        >
          {playerTwo.score}
        </Text>
      </HStack>
    )}
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
