import { Box, VStack } from '@gluestack-ui/themed'
import { Text } from 'appdeptus/designSystem'
import { Link } from 'expo-router'

const NotFoundScreen = () => (
  <Box
    alignItems='center'
    flex={1}
    justifyContent='center'
    p='$8'
  >
    <VStack
      space='md'
      w='$full'
    >
      <Text
        fontWeight='bold'
        size='xl'
      >
        Oh no!
      </Text>

      <Text size='lg'>
        The screen you were looking must have been lost in the warp
      </Text>

      <Link href='/'>
        <Text
          color='$primary500'
          size='lg'
        >
          Back to the Strategium
        </Text>
      </Link>
    </VStack>
  </Box>
)

export default NotFoundScreen
