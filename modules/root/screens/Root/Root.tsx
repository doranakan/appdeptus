import { Card, Text, VStack } from 'appdeptus/components'

const RootScreen = () => (
  <VStack className='flex-1 items-center justify-center bg-primary-950 p-4'>
    <Card>
      <VStack
        className='p-4'
        space='md'
      >
        <Text family='heading-regular'>Appdeptus</Text>
        <Text>Munitorum at work</Text>
      </VStack>
    </Card>
  </VStack>
)

export default RootScreen
