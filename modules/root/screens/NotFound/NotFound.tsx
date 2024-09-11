import { Box } from 'appdeptus/components/ui/box'
import { Text } from 'appdeptus/components/ui/text'
import { VStack } from 'appdeptus/components/ui/vstack'
import { Link } from 'expo-router'

const NotFoundScreen = () => (
  <Box className='items-center flex-1 justify-center p-8'>
    <VStack
      space='md'
      className='w-full'
    >
      <Text
        size='xl'
        className='font-bold'
      >
        Oh no!
      </Text>

      <Text size='lg'>
        The screen you were looking must have been lost in the warp
      </Text>

      <Link href='/'>
        <Text
          size='lg'
          className='text-primary-500'
        >
          Back to the Strategium
        </Text>
      </Link>
    </VStack>
  </Box>
)

export default NotFoundScreen
