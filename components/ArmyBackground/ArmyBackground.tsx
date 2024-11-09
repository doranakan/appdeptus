import { type CodexName } from 'appdeptus/models'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { snakeCase } from 'lodash'
import { memo } from 'react'
import { StyleSheet } from 'react-native'
import { themeColors, VStack } from '../ui'
type ArmyBackgroundProps = {
  codex: CodexName
}
const ArmyBackground = ({ codex }: ArmyBackgroundProps) => (
  <VStack className='absolute h-full w-full'>
    <Image
      source={snakeCase(codex.toLowerCase().replace("'", ''))}
      style={styles.image}
    />

    <LinearGradient
      colors={[
        themeColors[codex].primary[800],
        themeColors[codex].tertiary[800]
      ]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradient}
    />
  </VStack>
)

const styles = StyleSheet.create({
  gradient: { width: '100%', height: '100%', opacity: 0.8 },
  image: { position: 'absolute', width: '100%', height: '100%' }
})
export default memo(ArmyBackground)
