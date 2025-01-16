import {
  GameDataTable,
  GameUnitListItem,
  HStack,
  PlayerTag,
  Scoreboard,
  VStack
} from 'appdeptus/components'
import { memo } from 'react'
import Animated, {
  BounceInDown,
  FadeIn,
  FadeOut
} from 'react-native-reanimated'

const Content3 = () => (
  <Animated.View exiting={FadeOut}>
    <VStack space='md'>
      <Animated.View entering={FadeIn}>
        <Scoreboard
          playerOne={{
            army: {
              codex: {
                id: 0,
                name: 'Aeldari',
                faction: 'imperium'
              },
              id: 0,
              detachment: {
                enhancements: [],
                id: 0,
                name: ''
              },
              name: 'Army Two',
              points: 1990,
              roster: []
            },
            cp: 12,
            profile: {
              createdAt: '',
              id: '2',
              name: 'ildenso'
            },
            score: 12
          }}
          playerTwo={{
            army: {
              codex: {
                id: 0,
                name: 'Adepta Sororitas',
                faction: 'imperium'
              },
              id: 0,
              detachment: {
                enhancements: [],
                id: 0,
                name: ''
              },
              name: 'Army One',
              points: 2000,
              roster: []
            },
            cp: 12,
            profile: {
              createdAt: '',
              id: '1',
              name: 'doranakan'
            },
            score: 23
          }}
        />
      </Animated.View>
      <Animated.View entering={BounceInDown.duration(600).dampingRatio(200)}>
        <HStack className='justify-between'>
          <PlayerTag player={{ createdAt: '', id: '1', name: 'player_1' }} />
          <PlayerTag
            player={{ createdAt: '', id: '1', name: 'player_2' }}
            reversed
          />
        </HStack>
      </Animated.View>
      <Animated.View
        entering={BounceInDown.duration(600).dampingRatio(200).delay(400)}
      >
        <GameDataTable
          data={[
            {
              title: 'Warlord',
              valueL: 'Autarch',
              valueR: 'Canoness'
            },
            {
              title: 'Command points',
              valueL: '9',
              valueR: '5'
            },
            {
              title: 'Destroyed units',
              valueL: '4',
              valueR: '7'
            }
          ]}
        />
      </Animated.View>
      <Animated.View
        entering={BounceInDown.duration(600).dampingRatio(200).delay(500)}
      >
        <GameUnitListItem
          item={{
            type: 'squad',
            name: 'Rangers',
            upgrades: [],
            selectionId: '1',
            points: 55,
            models: [
              {
                killed: true,
                wounds: 0
              },
              {
                killed: true,
                wounds: 0
              },
              {
                killed: false,
                wounds: 0
              },
              {
                killed: false,
                wounds: 0
              },
              {
                killed: false,
                wounds: 0
              }
            ],
            warlord: false,
            id: 1
          }}
        />
      </Animated.View>
      <Animated.View
        entering={BounceInDown.duration(600).dampingRatio(200).delay(600)}
      >
        <GameUnitListItem
          item={{
            type: 'squad',
            name: 'Dark reapers',
            upgrades: [],
            selectionId: '1',
            points: 85,
            models: [
              {
                killed: true,
                wounds: 0
              },
              {
                killed: true,
                wounds: 0
              },
              {
                killed: true,
                wounds: 0
              },
              {
                killed: true,
                wounds: 0
              },
              {
                killed: true,
                wounds: 0
              }
            ],
            warlord: false,
            id: 1
          }}
        />
      </Animated.View>
      <Animated.View
        entering={BounceInDown.duration(600).dampingRatio(200).delay(700)}
      >
        <GameUnitListItem
          item={{
            type: 'vehicle',
            name: 'Falcon',
            upgrades: [],
            selectionId: '1',
            points: 130,
            models: [
              {
                killed: false,
                wounds: 8
              }
            ],
            warlord: false,
            id: 1
          }}
        />
      </Animated.View>
    </VStack>
  </Animated.View>
)

export default memo(Content3)
