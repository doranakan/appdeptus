import { Text, UnitListItem, VStack } from 'appdeptus/components'
import { memo } from 'react'
import Animated, {
  BounceInDown,
  FadeIn,
  FadeOut
} from 'react-native-reanimated'

const Content2 = () => (
  <Animated.View exiting={FadeOut}>
    <VStack space='md'>
      <Animated.View entering={FadeIn}>
        <Text
          family='heading-regular'
          size='2xl'
        >
          New game
        </Text>
      </Animated.View>
      <Animated.View entering={BounceInDown.duration(600).dampingRatio(200)}>
        <UnitListItem
          item={{
            type: 'character',
            name: 'Roboute Guilliman',
            upgrades: [],
            selectionId: '1',
            tier: {
              models: 1,
              id: 1,
              points: 285
            },
            warlord: true,
            id: 1,
            hero: true
          }}
        />
      </Animated.View>
      <Animated.View
        entering={BounceInDown.duration(600).dampingRatio(200).delay(200)}
      >
        <UnitListItem
          item={{
            type: 'team',
            leader: {
              name: 'Captain in Terminator Armour',
              upgrades: [],
              selectionId: '1',
              tier: {
                models: 1,
                id: 1,
                points: 95
              },
              warlord: false,
              id: 1,
              type: 'leader',
              hero: false
            },
            bodyguard: {
              id: 2,
              name: 'Terminator Squad',
              selectionId: '2',
              tier: {
                models: 5,
                id: 1,
                points: 170
              },
              type: 'squad',
              upgrades: []
            },
            id: '3'
          }}
        />
      </Animated.View>
      <Animated.View
        entering={BounceInDown.duration(600).dampingRatio(200).delay(400)}
      >
        <UnitListItem
          item={{
            type: 'embarked',
            crew: [
              {
                id: 2,
                name: 'Infernus Squad',
                selectionId: '2',
                tier: {
                  models: 10,
                  id: 1,
                  points: 160
                },
                type: 'squad',
                upgrades: []
              }
            ],
            id: '4',
            transport: {
              id: 2,
              name: 'Impulsor',
              selectionId: '2',
              tier: {
                models: 1,
                id: 1,
                points: 80
              },
              type: 'transport',
              upgrades: []
            }
          }}
        />
      </Animated.View>
    </VStack>
  </Animated.View>
)

export default memo(Content2)
