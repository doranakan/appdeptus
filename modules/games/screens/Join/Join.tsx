import { ScreenContainer, Text } from 'appdeptus/components'
import { useLocalSearchParams } from 'expo-router'

const JoinGameScreen = () => {
  const { gameId } = useLocalSearchParams<{ gameId: string }>()

  return (
    <ScreenContainer className='items-center justify-center'>
      <Text>{gameId}</Text>
    </ScreenContainer>
  )
}

export default JoinGameScreen
