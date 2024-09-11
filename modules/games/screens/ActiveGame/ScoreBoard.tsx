import { useCounter, useDebounceEffect } from 'ahooks'
import { SquareContainer } from 'appdeptus/components'
import { Box } from 'appdeptus/components/ui/box'
import { HStack } from 'appdeptus/components/ui/hstack'
import { Icon } from 'appdeptus/components/ui/icon'
import { Pressable } from 'appdeptus/components/ui/pressable'
import { Text } from 'appdeptus/components/ui/text'
import { VStack } from 'appdeptus/components/ui/vstack'
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
      <HStack className='h-full justify-between absolute px-4 w-full'>
        <Box className='bg-primary-600 h-full w-6' />
        <Box className='bg-teal-700 h-full w-6' />
      </HStack>
      <HStack className='gap-2 justify-between -mt-24 px-3'>
        <PlayerName name={pOneName} />
        <PlayerName
          name={pTwoName}
          reversed
        />
      </HStack>
      <VStack className='gap-6 py-8'>
        <HStack className='items-center justify-between'>
          <ScoreSetter
            onPressMinus={decPOneScore}
            onPressPlus={incPOneScore}
            score={localPOneScore}
            role='attacker'
          />
          <Text className='text-secondary-50'>Victory points</Text>
          <ScoreSetter
            onPressMinus={decPTwoScore}
            onPressPlus={incPTwoScore}
            score={localPTwoScore}
            role='defender'
          />
        </HStack>

        <HStack className='items-center justify-between'>
          <ScoreSetter
            onPressMinus={decPOneCP}
            onPressPlus={incPOneCP}
            score={localPOneCP}
            role='attacker'
          />
          <Text className='text-secondary-50'>Command points</Text>
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
    reversed={reversed}
    className='items-center flex-1 h-[60px]'
  >
    <SquareContainer>
      <Icon
        as={reversed ? Shield : Swords}
        size='lg'
        className={` ${reversed ? 'text-teal-700' : 'text-primary-600'} `}
      />
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
      <HStack className='flex-1'></HStack>
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
    reversed={role === 'defender'}
    className='items-center justify-between w-[56px]'
  >
    <Pressable
      hitSlop={20}
      onPress={() => {
        onPressMinus(1)
      }}
    >
      <Icon
        as={Minus}
        size='xs'
        className='text-secondary-50'
      />
    </Pressable>
    <Text
      bold
      className='text-secondary-50'
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
        size='xs'
        className='text-secondary-50'
      />
    </Pressable>
  </HStack>
)

export default memo(ScoreBoard)
