import { Box, HStack, Heading, Text, VStack } from '@gluestack-ui/themed'
import { SquareContainer } from 'appdeptus/components'
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
    <HStack
      h='$full'
      justifyContent='space-between'
      position='absolute'
      px='$4'
      w='$full'
    >
      <Box
        bg='$primary600'
        h='$full'
        w='$6'
      />
      <Box
        bg='$teal700'
        h='$full'
        w='$6'
      />
    </HStack>

    <HStack
      gap='$2'
      justifyContent='space-between'
      mt={-24}
      px='$3'
      pb='$10'
    >
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
    alignItems='center'
    flex={1}
    gap={6}
    h={60}
    reversed={reversed}
  >
    <SquareContainer
      borderColor={reversed ? '$teal700' : '$primary600'}
      size='$8'
    >
      <Heading size='sm'>{score}</Heading>
    </SquareContainer>
    <VStack flex={1}>
      <HStack
        alignItems='center'
        borderBottomWidth='$1'
        borderColor={'$white'}
        flex={1}
        pl={reversed ? undefined : '$1'}
        pr={reversed ? '$1' : undefined}
        reversed={reversed}
      >
        <Heading
          color={reversed ? '$teal50' : '$primary50'}
          ellipsizeMode='tail'
          numberOfLines={1}
        >
          {name}
        </Heading>
      </HStack>
      <HStack
        flex={1}
        pl={reversed ? undefined : '$1'}
        pr={reversed ? '$1' : undefined}
        reversed={reversed}
      >
        <Text color='$secondary50'>{reversed ? 'Defender' : 'Attacker'}</Text>
      </HStack>
    </VStack>
  </HStack>
)

export default memo(ScoreBoard)
