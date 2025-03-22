import {
  ArmyListItem,
  GameListItem,
  Profile,
  Text,
  VStack
} from 'appdeptus/components'
import { memo } from 'react'
import Animated, {
  BounceInDown,
  FadeIn,
  FadeOut
} from 'react-native-reanimated'

const Content5 = () => (
  <Animated.View exiting={FadeOut}>
    <VStack space='md'>
      <Animated.View entering={FadeIn}>
        <Text
          family='heading-regular'
          size='2xl'
        >
          Communities
        </Text>
      </Animated.View>
      <Animated.View entering={BounceInDown.duration(600).dampingRatio(200)}>
        <Profile
          date={DEMO_COMMUNITY.createdAt}
          variant='community'
          {...DEMO_COMMUNITY}
        />
      </Animated.View>
      <Animated.View
        entering={BounceInDown.duration(600).dampingRatio(200).delay(400)}
      >
        <VStack space='md'>
          <Text
            className='uppercase'
            family='body-bold'
          >
            Shared armies
          </Text>
          <ArmyListItem
            codex='Imperial Agents'
            detachment='Gladius Task Force'
            name='Tournament'
            points={2000}
            shareBy={{
              createdAt: '',
              id: '',
              name: 'skullidus'
            }}
          />
        </VStack>
      </Animated.View>
      <Animated.View
        entering={BounceInDown.duration(600).dampingRatio(200).delay(1000)}
      >
        <VStack space='md'>
          <Text
            className='uppercase'
            family='body-bold'
          >
            Ranked games
          </Text>
          <GameListItem
            game={{
              community: DEMO_COMMUNITY,
              status: 'ended',
              id: 1,
              lastUpdate: new Date(Date.now() - 800000000).toISOString(),
              round: 5,
              turn: 10,
              playerOne: {
                army: {
                  codex: {
                    faction: 'chaos',
                    id: 1,
                    name: "Emperor's Children"
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
                score: 35,
                isActive: true,
                isReady: true
              },
              playerTwo: {
                army: {
                  codex: {
                    faction: 'chaos',
                    id: 1,
                    name: 'Blood Angels'
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
                score: 10,
                isActive: false,
                isReady: true
              }
            }}
          />
        </VStack>
      </Animated.View>
    </VStack>
  </Animated.View>
)

const DEMO_COMMUNITY = {
  createdAt: new Date(Date.now() - 8000000000).toISOString(),
  id: 1,
  isSecret: false,
  name: 'Tabletop Adepts'
}

export default memo(Content5)
