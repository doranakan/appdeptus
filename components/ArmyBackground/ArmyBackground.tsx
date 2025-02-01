/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type CodexName } from 'appdeptus/models'
import Image from '@d11/react-native-fast-image'
import { LinearGradient } from 'expo-linear-gradient'
import { memo } from 'react'
import { StyleSheet } from 'react-native'
import { themeColors, VStack } from '../ui'
import { Asset } from 'expo-asset'

type ArmyBackgroundProps = {
  codex: CodexName
}
const ArmyBackground = ({ codex }: ArmyBackgroundProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const image = Asset.fromModule(source[codex])

  return (
    <VStack className='absolute h-full w-full'>
      <Image
        source={{ uri: image.localUri ?? image.uri }}
        style={styles.image}
        resizeMode={Image.resizeMode.cover}
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
}

const styles = StyleSheet.create({
  gradient: { width: '100%', height: '100%', opacity: 0.8 },
  image: { position: 'absolute', width: '100%', height: '100%', flex: 1 }
})

const source = {
  'Adepta Sororitas': require('assets/resources/armies/adepta_sororitas.jpg'),
  'Adeptus Custodes': require('assets/resources/armies/adeptus_custodes.jpg'),
  'Adeptus Mechanicus': require('assets/resources/armies/adeptus_mechanicus.jpg'),
  Aeldari: require('assets/resources/armies/aeldari.jpg'),
  'Astra Militarum': require('assets/resources/armies/astra_militarum.jpg'),
  'Black Templars': require('assets/resources/armies/black_templars.jpg'),
  'Blood Angels': require('assets/resources/armies/blood_angels.jpg'),
  'Chaos Daemons': require('assets/resources/armies/chaos_daemons.jpg'),
  'Chaos Knights': require('assets/resources/armies/chaos_knights.jpg'),
  'Chaos Space Marines': require('assets/resources/armies/chaos_space_marines.jpg'),
  'Dark Angels': require('assets/resources/armies/dark_angels.jpg'),
  'Death Guard': require('assets/resources/armies/death_guard.jpg'),
  Drukhari: require('assets/resources/armies/drukhari.jpg'),
  "Emperor's Children": require('assets/resources/armies/emperors_children.jpg'),
  'Genestealer Cults': require('assets/resources/armies/genestealer_cults.jpg'),
  'Grey Knights': require('assets/resources/armies/grey_knights.jpg'),
  'Imperial Agents': require('assets/resources/armies/imperial_agents.jpg'),
  'Imperial Knights': require('assets/resources/armies/imperial_knights.jpg'),
  'Leagues Of Votann': require('assets/resources/armies/leagues_of_votann.jpg'),
  Necrons: require('assets/resources/armies/necrons.jpg'),
  Orks: require('assets/resources/armies/orks.jpg'),
  'Space Marines': require('assets/resources/armies/space_marines.jpg'),
  'Space Wolves': require('assets/resources/armies/space_wolves.jpg'),
  "T'au Empire": require('assets/resources/armies/tau_empire.jpg'),
  'Thousand Sons': require('assets/resources/armies/thousand_sons.jpg'),
  Tyranids: require('assets/resources/armies/tyranids.jpg'),
  'World Eaters': require('assets/resources/armies/world_eaters.jpg')
} as const satisfies Record<CodexName, string>

export default memo(ArmyBackground)
