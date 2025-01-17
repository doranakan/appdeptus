import { Text, VStack } from 'appdeptus/components'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

const Text2 = () => (
  <Animated.View
    entering={FadeIn}
    exiting={FadeOut}
  >
    <VStack space='md'>
      <Text
        family='heading-regular'
        size='3xl'
      >
        Prepare for battle
      </Text>

      <Text>Set up your rosters to play.</Text>
    </VStack>
  </Animated.View>
)

export default Text2
