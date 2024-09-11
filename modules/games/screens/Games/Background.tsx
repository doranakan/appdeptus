import { Box, VStack } from '@gluestack-ui/themed'
import { BackgroundImage, LinearGradient } from 'appdeptus/components'
const Background = () => (
  <VStack
    h='$full'
    position='absolute'
    w='$full'
  >
    <BackgroundImage source='games' />
    <Box
      h='$full'
      position='absolute'
      w='$full'
    >
      <LinearGradient colors={['$secondary800', '$transparent']} />
    </Box>
  </VStack>
)

export default Background
