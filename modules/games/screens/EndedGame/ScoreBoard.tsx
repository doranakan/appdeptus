import { SquareContainer } from 'appdeptus/components'
import { Box } from 'appdeptus/components/ui/box'
import { HStack } from 'appdeptus/components/ui/hstack'
import { Text } from 'appdeptus/components/ui/text'
import { VStack } from 'appdeptus/components/ui/vstack'
import { memo } from 'react'

type ScoreBoardProps = {
  pOneName: string
  pOneScore: number
  pTwoName: string
  pTwoScore: number
}

const ScoreBoard = ({
  pOneName,
  pOneScore,
  pTwoName,
  pTwoScore
}: ScoreBoardProps) => (
  <VStack>
    <HStack className='h-full justify-between absolute px-4 w-full'>
      <Box className='bg-primary-600 h-full w-6' />
      <Box className='bg-teal-700 h-full w-6' />
    </HStack>

    <HStack className='gap-2 justify-between -mt-24 px-1.5 pb-10'>
      <PlayerName
        name={pOneName}
        score={pOneScore}
      />
      <PlayerName
        name={pTwoName}
        score={pTwoScore}
        reversed
      />
    </HStack>
  </VStack>
)

type PlayerNameProps = {
  name: string
  score: number

  reversed?: boolean
}

const PlayerName = ({ name, score, reversed }: PlayerNameProps) => (
  <HStack
    reversed={reversed}
    className='items-center flex-1 h-[60px]'
  >
    <SquareContainer>
      <Text
        bold
        size='sm'
      >
        {score}
      </Text>
    </SquareContainer>
    <VStack className='flex-1'>
      <HStack
        reversed={reversed}
        className={` ${reversed ? 'pr-1' : undefined} ${reversed ? undefined : 'pl-1'} items-center border-b-1 border-white flex-1 `}
      >
        <Text
          bold
          ellipsizeMode='tail'
          numberOfLines={1}
          className={` ${reversed ? 'text-teal-50' : 'text-primary-50'} `}
        >
          {name}
        </Text>
      </HStack>
      <HStack
        reversed={reversed}
        className={` ${reversed ? 'pr-1' : undefined} ${reversed ? undefined : 'pl-1'} flex-1 `}
      >
        <Text className='text-secondary-50'>
          {reversed ? 'Defender' : 'Attacker'}
        </Text>
      </HStack>
    </VStack>
  </HStack>
)

export default memo(ScoreBoard)
