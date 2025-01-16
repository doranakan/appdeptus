import { Text, VStack } from 'appdeptus/components'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

const Text3 = () => (
  <Animated.View
    entering={FadeIn}
    exiting={FadeOut}
  >
    <VStack space='md'>
      <Text
        family='heading-regular'
        size='3xl'
      >
        Fight opponents
      </Text>

      <Text>Track score, wounds and kills during games.</Text>
    </VStack>
  </Animated.View>
)

export default Text3
