import { VStack } from 'appdeptus/components/ui'
import { Text } from 'react-native'

const RootScreen = () => (
  <VStack className='flex-1 items-center justify-center'>
    <Text
      style={{
        fontFamily: 'Silkscreen_400Regular'
      }}
    >
      Appdeptus
    </Text>
    <Text
      style={{
        fontFamily: 'IBMPlexMono_400Regular'
      }}
    >
      Munitorum at work
    </Text>
  </VStack>
)

export default RootScreen
