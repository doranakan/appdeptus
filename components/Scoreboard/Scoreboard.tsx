import { shortCodexNames } from 'appdeptus/constants'
import { type Player } from 'appdeptus/models/game'
import { memo } from 'react'
import Text from '../Text'
import { HStack } from '../ui'

type ScoreboardProps = {
  playerOne: Player
  playerTwo: Player
}

const Scoreboard = ({ playerOne, playerTwo }: ScoreboardProps) => (
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
        size='4xl'
        family='heading-regular'
      >
        {playerOne.score}
      </Text>
      <Text
        size='4xl'
        family='heading-regular'
      >
        -
      </Text>
      <Text
        size='4xl'
        family='heading-regular'
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
