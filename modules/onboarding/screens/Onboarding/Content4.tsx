import { Text, VStack } from 'appdeptus/components'
import GameListItem from 'appdeptus/modules/games/screens/Tab/GameListItem'
import { memo } from 'react'
import Animated, {
  BounceInDown,
  FadeIn,
  FadeOut
} from 'react-native-reanimated'

const Content4 = () => (
  <Animated.View exiting={FadeOut}>
    <VStack space='md'>
      <Animated.View entering={FadeIn}>
        <Text
          family='heading-regular'
          size='2xl'
        >
          Games
        </Text>
      </Animated.View>
      <Animated.View entering={BounceInDown.duration(600).dampingRatio(200)}>
        <GameListItem
          game={{
            status: 'ended',
            id: 1,
            lastUpdate: new Date(Date.now() - 100000000).toISOString(),
            round: 5,
            turn: 10,
            playerOne: {
              army: {
                codex: {
                  faction: 'chaos',
                  id: 1,
                  name: 'Death Guard'
                },
                detachment: { enhancements: [], id: 1, name: '' },
                id: 1,
                name: '',
                points: 1,
                roster: []
              },
              cp: 1,
              profile: {
                name: 'player_1',
                createdAt: '',
                id: '1'
              },
              score: 12,
              isActive: true,
              isReady: true
            },
            playerTwo: {
              army: {
                codex: {
                  faction: 'chaos',
                  id: 1,
                  name: 'Grey Knights'
                },
                detachment: { enhancements: [], id: 1, name: '' },
                id: 1,
                name: '',
                points: 1,
                roster: []
              },
              cp: 1,
              profile: {
                name: 'player_2',
                createdAt: '',
                id: '1'
              },
              score: 19,
              isActive: false,
              isReady: true
            }
          }}
        />
      </Animated.View>
      <Animated.View
        entering={BounceInDown.duration(600).dampingRatio(200).delay(400)}
      >
        <GameListItem
          game={{
            status: 'ended',
            id: 1,
            lastUpdate: new Date(Date.now() - 700000000).toISOString(),
            round: 5,
            turn: 10,
            playerOne: {
              army: {
                codex: {
                  faction: 'chaos',
                  id: 1,
                  name: 'Space Marines'
                },
                detachment: { enhancements: [], id: 1, name: '' },
                id: 1,
                name: '',
                points: 1,
                roster: []
              },
              cp: 1,
              profile: {
                name: 'player_1',
                createdAt: '',
                id: '1'
              },
              score: 45,
              isActive: true,
              isReady: true
            },
            playerTwo: {
              army: {
                codex: {
                  faction: 'chaos',
                  id: 1,
                  name: 'Tyranids'
                },
                detachment: { enhancements: [], id: 1, name: '' },
                id: 1,
                name: '',
                points: 1,
                roster: []
              },
              cp: 1,
              profile: {
                name: 'player_2',
                createdAt: '',
                id: '1'
              },
              score: 80,
              isActive: false,
              isReady: true
            }
          }}
        />
      </Animated.View>
      <Animated.View
        entering={BounceInDown.duration(600).dampingRatio(200).delay(1000)}
      >
        <GameListItem
          game={{
            status: 'ended',
            id: 1,
            lastUpdate: new Date(Date.now() - 1000000000).toISOString(),
            round: 5,
            turn: 10,
            playerOne: {
              army: {
                codex: {
                  faction: 'chaos',
                  id: 1,
                  name: 'Black Templars'
                },
                detachment: { enhancements: [], id: 1, name: '' },
                id: 1,
                name: '',
                points: 1,
                roster: []
              },
              cp: 1,
              profile: {
                name: 'player_1',
                createdAt: '',
                id: '1'
              },
              score: 50,
              isActive: false,
              isReady: true
            },
            playerTwo: {
              army: {
                codex: {
                  faction: 'chaos',
                  id: 1,
                  name: 'Orks'
                },
                detachment: { enhancements: [], id: 1, name: '' },
                id: 1,
                name: '',
                points: 1,
                roster: []
              },
              cp: 1,
              profile: {
                name: 'player_2',
                createdAt: '',
                id: '1'
              },
              score: 20,
              isActive: true,
              isReady: true
            }
          }}
        />
      </Animated.View>
    </VStack>
  </Animated.View>
)

export default memo(Content4)
