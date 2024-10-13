import { VStack } from 'appdeptus/components/ui'
import { Text } from 'react-native'

const RootScreen = () => (
  <VStack className='flex-1 items-center justify-center bg-primary-600'>
    <Text
      className='text-primary-300'
      style={{
        fontFamily: 'Silkscreen_400Regular'
      }}
    >
      Appdeptus
    </Text>
    <Text
      className='text-primary-400'
      style={{
        fontFamily: 'IBMPlexMono_400Regular'
      }}
    >
      Munitorum at work
    </Text>
  </VStack>
)

export default RootScreen
