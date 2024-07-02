import { VStack } from '@gluestack-ui/themed'
import { BackgroundImage } from 'appdeptus/components'
import { StatusBar } from 'expo-status-bar'

const Background = () => (
  <VStack
    h='$full'
    position='absolute'
    w='$full'
  >
    <StatusBar
      animated
      style='dark'
    />
    <BackgroundImage
      source='armybuilder'
      opacity={0.5}
    />
  </VStack>
)

export default Background
