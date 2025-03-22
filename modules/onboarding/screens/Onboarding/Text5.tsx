import { Text, VStack } from 'appdeptus/components'
import Animated, { FadeIn } from 'react-native-reanimated'

const Text5 = () => (
  <Animated.View entering={FadeIn.delay(400)}>
    <VStack space='md'>
      <Text
        family='heading-regular'
        size='3xl'
      >
        Communities
      </Text>

      <Text>Create or join a community, share rosters, play ranked games.</Text>
    </VStack>
  </Animated.View>
)

export default Text5
