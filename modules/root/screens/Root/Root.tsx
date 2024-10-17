import { Card, VStack } from 'appdeptus/components'
import { Text } from 'react-native'

const RootScreen = () => (
  <VStack className='flex-1 items-center justify-center bg-primary-950 p-4'>
    <Card>
      <VStack
        className='p-4'
        space='md'
      >
        <Text
          className='text-typography-50'
          style={{
            fontFamily: 'Silkscreen_400Regular'
          }}
        >
          Appdeptus
        </Text>
        <Text
          className='text-typography-50'
          style={{
            fontFamily: 'IBMPlexMono_400Regular'
          }}
        >
          Munitorum at work
        </Text>
      </VStack>
    </Card>
  </VStack>
)

export default RootScreen
