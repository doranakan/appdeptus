import {
  Badge,
  GameDataTable,
  HStack,
  NavigationHeader,
  Text,
  VStack,
  VersusBackground,
  themeColors,
  type Button
} from 'appdeptus/components'
import { shortCodexNames } from 'appdeptus/constants'
import { LinearGradient } from 'expo-linear-gradient'

import { type Army } from 'appdeptus/models'
import { memo, type ComponentProps } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type ArmySelectionTopContainerProps = {
  armyOne: Army
  player: 'one' | 'two'
  rightButton: ComponentProps<typeof Button>

  armyTwo?: Army
}

const ArmySelectionTopContainer = ({
  armyOne,
  player,
  rightButton,

  armyTwo
}: ArmySelectionTopContainerProps) => (
  <VStack className='flex-1'>
    <VersusBackground
      codexOne={armyOne.codex.name}
      codexTwo={armyTwo?.codex.name}
    />
    <LinearGradient
      colors={[
        `${themeColors[player === 'one' ? armyOne.codex.name : armyTwo ? armyTwo.codex.name : 'default'].primary[950]}00`,
        themeColors[
          player === 'one'
            ? armyOne.codex.name
            : armyTwo
              ? armyTwo.codex.name
              : 'default'
        ].primary[950]
      ]}
      style={styles.gradient}
    />
    <SafeAreaView
      edges={['top']}
      style={styles.safeAreaView}
    >
      <VStack className='flex-1 justify-between px-4'>
        <NavigationHeader
          variant='backButton'
          rightButton={rightButton}
        />
        <VStack space='md'>
          <HStack className='justify-between'>
            <Text
              className='uppercase'
              family='body-bold'
              size='4xl'
            >
              {shortCodexNames[armyOne.codex.name]}
            </Text>
            {armyTwo ? (
              <Text
                className='uppercase'
                family='body-bold'
                size='4xl'
              >
                {shortCodexNames[armyTwo.codex.name]}
              </Text>
            ) : null}
          </HStack>
          <HStack className='justify-between'>
            <Badge
              text={armyOne.composition.detachment.name}
              codex={armyOne.codex.name}
            />
            {armyTwo ? (
              <Badge
                text={armyTwo.composition.detachment.name}
                codex={armyTwo.codex.name}
              />
            ) : null}
          </HStack>
          <GameDataTable
            data={[
              {
                title: 'Warlord',
                valueL:
                  armyOne.composition.warlord.type === 'team'
                    ? armyOne.composition.warlord.leader.name
                    : armyOne.composition.warlord.name,
                valueR: armyTwo
                  ? armyTwo.composition.warlord.type === 'team'
                    ? armyTwo.composition.warlord.leader.name
                    : armyTwo.composition.warlord.name
                  : ''
              },
              {
                title: 'Points',
                valueL: `${armyOne.points}PTS`,
                valueR: armyTwo ? `${armyTwo.points}PTS` : ''
              }
            ]}
          />
        </VStack>
      </VStack>
    </SafeAreaView>
  </VStack>
)

const styles = StyleSheet.create({
  gradient: {
    bottom: 0,
    height: '25%',
    position: 'absolute',
    width: '100%'
  },
  safeAreaView: {
    flex: 1
  }
})

export default memo(ArmySelectionTopContainer)
