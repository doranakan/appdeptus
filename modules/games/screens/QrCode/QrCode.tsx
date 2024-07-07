import { Text, VStack } from '@gluestack-ui/themed'
import { Link, useLocalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const QrCodeScreen = () => {
  const { gameId } = useLocalSearchParams<{ gameId: string }>()

  return (
    <VStack
      alignItems='center'
      flex={1}
      justifyContent='center'
    >
      <StatusBar
        animated
        style='light'
      />

      <Link href='games'>
        <Text>{gameId}</Text>
      </Link>
    </VStack>
  )
}

export default QrCodeScreen
