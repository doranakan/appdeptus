import { BackgroundImage, LinearGradient } from 'appdeptus/components'
import { Box } from 'appdeptus/components/ui/box'
import { VStack } from 'appdeptus/components/ui/vstack'
const Background = () => (
  <VStack className='h-full absolute w-full'>
    <BackgroundImage source='games' />
    <Box className='h-full absolute w-full'>
      <LinearGradient colors={['$secondary800', '$transparent']} />
    </Box>
  </VStack>
)

export default Background
