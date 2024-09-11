import { BackgroundImage } from 'appdeptus/components'
import { VStack } from 'appdeptus/components/ui/vstack'
import { StatusBar } from 'expo-status-bar'

const Background = () => (
  <VStack className='h-full absolute w-full'>
    <StatusBar
      animated
      style='dark'
    />
    <BackgroundImage
      source='army_builder'
      opacity={0.5}
    />
  </VStack>
)

export default Background
