import {
  ArmyRoster,
  ScreenContainer,
  ScreenTitle,
  Text,
  themeColors,
  VersusBackground,
  VStack
} from 'appdeptus/components'
import { type CreateGame } from 'appdeptus/models/game'
import { LinearGradient } from 'expo-linear-gradient'
import { useFormContext } from 'react-hook-form'
import { StyleSheet } from 'react-native'
import DataTable from './DataTable'

const DoubleCheckScreen = () => {
  const { watch } = useFormContext<CreateGame>()

  const codex = watch('playerOne.army.codex.name')

  const roster = watch('playerOne.army.roster')

  return (
    <ScreenContainer
      className='bg-primary-950 p-4'
      space='md'
    >
      <VStack className='absolute h-full w-full'>
        <VStack className='flex-1'>
          <VersusBackground codexOne={codex} />
          <LinearGradient
            colors={[
              themeColors[codex].primary[950],
              `${themeColors[codex].primary[950]}00`
            ]}
            style={styles.gradient}
          />
        </VStack>
        <VStack className='flex-1' />
      </VStack>

      <ScreenTitle>{codex}</ScreenTitle>

      <Text
        family='body-regular-italic'
        size='sm'
      >
        Your forces are assembled and your army stands ready, warrior! Tap the
        QR Seal of the machine God in the top right. This sacred glyph shall
        encode your war protocols. Let your opponent scan it, and the rites of
        battle shall commence.
      </Text>

      <ArmyRoster
        ListHeaderComponent={
          <VStack space='md'>
            <DataTable />
            <VStack />
          </VStack>
        }
        roster={roster}
      />
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  gradient: {
    height: '25%',
    position: 'absolute',
    width: '100%'
  }
})

export default DoubleCheckScreen
