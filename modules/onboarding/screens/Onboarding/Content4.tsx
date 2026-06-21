import { GameListItem, Text, VStack } from 'appdeptus/components'
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
                battleSize: 'strike-force',
                detachments: [{ enhancements: [], id: 1, name: '', detachmentPoints: 1 }],
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
                battleSize: 'strike-force',
                detachments: [{ enhancements: [], id: 1, name: '', detachmentPoints: 1 }],
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
                battleSize: 'strike-force',
                detachments: [{ enhancements: [], id: 1, name: '', detachmentPoints: 1 }],
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
                battleSize: 'strike-force',
                detachments: [{ enhancements: [], id: 1, name: '', detachmentPoints: 1 }],
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
                battleSize: 'strike-force',
                detachments: [{ enhancements: [], id: 1, name: '', detachmentPoints: 1 }],
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
                battleSize: 'strike-force',
                detachments: [{ enhancements: [], id: 1, name: '', detachmentPoints: 1 }],
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
