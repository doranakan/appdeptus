import { skipToken } from '@reduxjs/toolkit/query'
import { LinearGradient, Loading } from 'appdeptus/components'
import { VStack } from 'appdeptus/components/ui/vstack'
import { useLocalSearchParams } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useGetGameQuery } from '../../api'
import { Armies, Background } from '../../components'
import Header from './Header'
import ScoreBoard from './ScoreBoard'

const EndedGameScreen = () => {
  const { gameId } = useLocalSearchParams<{ gameId: string }>()

  const insets = useSafeAreaInsets()

  const { data } = useGetGameQuery(gameId ?? skipToken)

  if (!data || data.status !== 'ended') {
    return <Loading />
  }

  return (
    <VStack className='flex-1'>
      <VStack className='h-full absolute w-full'>
        <Background
          codexOne={data.playerOne.army.codex.name}
          codexTwo={data.playerTwo.army.codex.name}
          opacity={1}
        />
        <VStack className='flex-1'>
          <LinearGradient colors={['$secondary800', '$transparent']} />
        </VStack>
        <VStack className='flex-1'>
          <LinearGradient colors={['$transparent', '$secondary800']} />
        </VStack>
      </VStack>
      <VStack className={` pt-${insets.top} pb-${insets.bottom} flex-1 px-4 `}>
        <Header lastUpdate={data.lastUpdate} />

        <VStack className='flex-1 gap-4 justify-end py-4'>
          <VStack>
            <ScoreBoard
              pOneName={data.playerOne.name}
              pOneScore={data.playerOne.score}
              pTwoName={data.playerTwo.name}
              pTwoScore={data.playerTwo.score}
            />
            <Armies
              armyOne={data.playerOne.army}
              armyTwo={data.playerTwo.army}
            />
          </VStack>
        </VStack>
      </VStack>
    </VStack>
  )
}

export default EndedGameScreen
