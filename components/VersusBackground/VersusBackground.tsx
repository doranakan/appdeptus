import { type CodexName } from 'appdeptus/models'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet } from 'react-native'
import ArmyBackground from '../ArmyBackground'
import { HStack, VStack, themeColors } from '../ui'

type VersusBackgroundProps = {
  codexOne: CodexName
  codexTwo?: CodexName
}

const VersusBackground = ({ codexOne, codexTwo }: VersusBackgroundProps) => (
  <HStack className='absolute h-full w-full'>
    <VStack className='flex-1'>
      <ArmyBackground codex={codexOne} />
      <LinearGradient
        colors={[
          `${themeColors.default.primary[950]}00`,
          themeColors.default.primary[950]
        ]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      />
    </VStack>
    <VStack className='flex-1'>
      {codexTwo ? <ArmyBackground codex={codexTwo} /> : null}
      <LinearGradient
        colors={[
          themeColors.default.primary[950],
          `${themeColors.default.primary[950]}00`
        ]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      />
    </VStack>
  </HStack>
)

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    height: '100%',
    width: '100%'
  }
})

export default VersusBackground
