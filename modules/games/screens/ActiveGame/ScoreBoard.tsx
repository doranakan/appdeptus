import {
  Box,
  HStack,
  Icon,
  Pressable,
  Text,
  VStack
} from '@gluestack-ui/themed'
import { useCounter, useDebounceEffect } from 'ahooks'
import { SquareContainer } from 'appdeptus/components'
import { Minus, Plus, Shield, Swords } from 'lucide-react-native'
import { memo, useEffect } from 'react'
import { useUpdateScoreAndCPMutation } from '../../api'

type ScoreBoardProps = {
  gameId: string
  pOneCP: number
  pOneName: string
  pOneScore: number
  pTwoCP: number
  pTwoName: string
  pTwoScore: number
}

const ScoreBoard = ({
  gameId,
  pOneCP,
  pOneName,
  pOneScore,
  pTwoCP,
  pTwoName,
  pTwoScore
}: ScoreBoardProps) => {
  const [
    localPOneScore,
    { dec: decPOneScore, inc: incPOneScore, set: setPOneScore }
  ] = useCounter(pOneScore, { min: 0, max: 100 })
  const [localPOneCP, { dec: decPOneCP, inc: incPOneCP, set: setPOneCP }] =
    useCounter(pOneCP, {
      min: 0,
      max: 12
    })
  const [
    localPTwoScore,
    { dec: decPTwoScore, inc: incPTwoScore, set: setPTwoScore }
  ] = useCounter(pTwoScore, { min: 0, max: 100 })
  const [localPTwoCP, { dec: decPTwoCP, inc: incPTwoCP, set: setPTwoCP }] =
    useCounter(pTwoCP, {
      min: 0,
      max: 12
    })

  const [updateScoreAndCP] = useUpdateScoreAndCPMutation()

  useEffect(() => {
    setPOneCP(pOneCP)
    setPOneScore(pOneScore)
    setPTwoCP(pTwoCP)
    setPTwoScore(pTwoScore)
  }, [
    pOneCP,
    pOneScore,
    pTwoCP,
    pTwoScore,
    setPOneCP,
    setPOneScore,
    setPTwoCP,
    setPTwoScore
  ])

  useDebounceEffect(
    () => {
      if (
        localPOneCP !== pOneCP ||
        localPOneScore !== pOneScore ||
        localPTwoCP !== pTwoCP ||
        localPTwoScore !== pTwoScore
      ) {
        updateScoreAndCP({
          gameId,
          pOneCP: localPOneCP,
          pOneScore: localPOneScore,
          pTwoCP: localPTwoCP,
          pTwoScore: localPTwoScore
        })
      }
    },
    [
      localPOneScore,
      localPOneCP,
      localPTwoScore,
      localPTwoCP,
      updateScoreAndCP,
      gameId
    ],
    {
      wait: 1000
    }
  )

  return (
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
      >
        <PlayerName name={pOneName} />
        <PlayerName
          name={pTwoName}
          reversed
        />
      </HStack>

      <VStack
        gap='$6'
        py='$8'
      >
        <HStack
          alignItems='center'
          justifyContent='space-between'
        >
          <ScoreSetter
            onPressMinus={decPOneScore}
            onPressPlus={incPOneScore}
            score={localPOneScore}
            role='attacker'
          />
          <Text color='$secondary50'>Victory points</Text>
          <ScoreSetter
            onPressMinus={decPTwoScore}
            onPressPlus={incPTwoScore}
            score={localPTwoScore}
            role='defender'
          />
        </HStack>

        <HStack
          alignItems='center'
          justifyContent='space-between'
        >
          <ScoreSetter
            onPressMinus={decPOneCP}
            onPressPlus={incPOneCP}
            score={localPOneCP}
            role='attacker'
          />
          <Text color='$secondary50'>Command points</Text>
          <ScoreSetter
            onPressMinus={decPTwoCP}
            onPressPlus={incPTwoCP}
            score={localPTwoCP}
            role='defender'
          />
        </HStack>
      </VStack>
    </VStack>
  )
}

type PlayerNameProps = {
  name: string
  reversed?: boolean
}

const PlayerName = ({ name, reversed }: PlayerNameProps) => (
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
      <Icon
        as={reversed ? Shield : Swords}
        color={reversed ? '$teal700' : '$primary600'}
        size='lg'
      />
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
        <Text
          bold
          color={reversed ? '$teal50' : '$primary50'}
          ellipsizeMode='tail'
          numberOfLines={1}
        >
          {name}
        </Text>
      </HStack>
      <HStack flex={1}></HStack>
    </VStack>
  </HStack>
)

type ScoreSetterProps = {
  onPressMinus: (delta: number) => void
  onPressPlus: (delta: number) => void
  score: number
  role: 'attacker' | 'defender'
}

const ScoreSetter = ({
  onPressMinus,
  onPressPlus,
  score,
  role
}: ScoreSetterProps) => (
  <HStack
    alignItems='center'
    justifyContent='space-between'
    reversed={role === 'defender'}
    w={56}
  >
    <Pressable
      hitSlop={20}
      onPress={() => {
        onPressMinus(1)
      }}
    >
      <Icon
        as={Minus}
        color='$secondary50'
        size='xs'
      />
    </Pressable>
    <Text
      bold
      color='$secondary50'
    >
      {score}
    </Text>
    <Pressable
      hitSlop={20}
      onPress={() => {
        onPressPlus(1)
      }}
    >
      <Icon
        as={Plus}
        color='$secondary50'
        size='xs'
      />
    </Pressable>
  </HStack>
)

export default memo(ScoreBoard)
