import { ArmyListItem, Text, VStack } from 'appdeptus/components'
import { memo } from 'react'
import Animated, {
  BounceInDown,
  FadeIn,
  FadeOut
} from 'react-native-reanimated'

const Content1 = () => (
  <Animated.View exiting={FadeOut}>
    <VStack space='md'>
      <Animated.View entering={FadeIn}>
        <Text
          family='heading-regular'
          size='2xl'
        >
          Army library
        </Text>
      </Animated.View>
      <Animated.View
        entering={BounceInDown.duration(600).dampingRatio(200).delay(600)}
      >
        <ArmyListItem
          codex='Space Marines'
          detachment='Gladius Task Force'
          name='Tournament'
          points={2000}
        />
      </Animated.View>
      <Animated.View
        entering={BounceInDown.duration(600).dampingRatio(200).delay(800)}
      >
        <ArmyListItem
          codex='Adepta Sororitas'
          detachment='Penitent Host'
          name='Boarding Actions'
          points={500}
        />
      </Animated.View>
      <Animated.View
        entering={BounceInDown.duration(600).dampingRatio(200).delay(1000)}
      >
        <ArmyListItem
          codex='World Eaters'
          detachment='Berzerked Warband'
          name='Incursion'
          points={1000}
        />
      </Animated.View>
    </VStack>
  </Animated.View>
)

export default memo(Content1)
