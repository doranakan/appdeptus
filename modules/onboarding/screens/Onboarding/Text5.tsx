import { Text, VStack } from 'appdeptus/components'
import Animated, { FadeIn } from 'react-native-reanimated'

const Text5 = () => (
  <Animated.View entering={FadeIn.delay(400)}>
    <VStack space='md'>
      <Text
        family='heading-regular'
        size='3xl'
      >
        All set
      </Text>

      <Text>Choose your nickname and start.</Text>
    </VStack>
  </Animated.View>
)

export default Text5
