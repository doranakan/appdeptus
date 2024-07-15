import { VStack } from '@gluestack-ui/themed'
import { skipToken } from '@reduxjs/toolkit/query'
import { LinearGradient, Loading } from 'appdeptus/components'
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
    <VStack flex={1}>
      <VStack
        h='$full'
        position='absolute'
        w='$full'
      >
        <Background
          codexOne={data.playerOne.army.codex.name}
          codexTwo={data.playerTwo.army.codex.name}
          opacity={1}
        />
        <VStack flex={1}>
          <LinearGradient colors={['$secondary800', '$transparent']} />
        </VStack>
        <VStack flex={1}>
          <LinearGradient colors={['$transparent', '$secondary800']} />
        </VStack>
      </VStack>

      <VStack
        flex={1}
        pb={insets.bottom}
        px='$4'
        pt={insets.top}
      >
        <Header lastUpdate={data.lastUpdate} />

        <VStack
          flex={1}
          gap='$4'
          justifyContent='flex-end'
          py='$4'
        >
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
