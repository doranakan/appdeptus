import { Text, VStack } from '@gluestack-ui/themed'
import { useLocalSearchParams } from 'expo-router'

const PlayGameScreen = () => {
  const { gameId } = useLocalSearchParams<{ gameId: string }>()
  return (
    <VStack
      alignItems='center'
      flex={1}
      justifyContent='center'
    >
      <Text>Play game:{gameId}</Text>
    </VStack>
  )
}

export default PlayGameScreen
