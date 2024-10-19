import { type CodexName } from 'appdeptus/models'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { snakeCase } from 'lodash'
import { StyleSheet } from 'react-native'
import { themeColors, VStack } from '../ui'
type ArmyBackgroundProps = {
  codex: CodexName

  opacity?: string
}
const ArmyBackground = ({
  codex,
  opacity = 'opacity-40'
}: ArmyBackgroundProps) => (
  <VStack className='absolute h-full w-full'>
    <Image
      source={snakeCase(codex)}
      style={styles.image}
    />
    <VStack className={opacity}>
      <LinearGradient
        colors={[
          themeColors[codex].primary[600],
          themeColors[codex].secondary[800]
        ]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      />
    </VStack>
  </VStack>
)

const styles = StyleSheet.create({
  gradient: { width: '100%', height: '100%' },
  image: { position: 'absolute', width: '100%', height: '100%' }
})
export default ArmyBackground
