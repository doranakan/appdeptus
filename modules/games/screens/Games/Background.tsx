import { VStack } from '@gluestack-ui/themed'
import { BackgroundImage, LinearGradient } from 'appdeptus/components'
const Background = () => (
  <VStack
    h='$full'
    position='absolute'
    w='$full'
  >
    <BackgroundImage
      source='games'
      opacity={0.4}
    />
    <LinearGradient
      colors={['$secondary800', '$transparent']}
      position='absolute'
    />
  </VStack>
)

export default Background
