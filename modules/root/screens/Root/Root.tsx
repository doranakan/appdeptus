import { Box, VStack } from '@gluestack-ui/themed'
import { Heading } from 'appdeptus/designSystem'
import { SignInForm } from '../../components'

const RootScreen = () => (
  <Box
    alignItems='center'
    flex={1}
    justifyContent='center'
    p='$8'
  >
    <VStack
      rowGap='$4'
      w='$full'
    >
      <Heading size='xl'>Sign In</Heading>
      <SignInForm />
    </VStack>
  </Box>
)

export default RootScreen
