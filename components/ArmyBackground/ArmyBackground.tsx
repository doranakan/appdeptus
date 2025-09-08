import Image from '@d11/react-native-fast-image'
import { type CodexName } from 'appdeptus/models'
import adepta_sororitas from 'assets/resources/armies/adepta_sororitas.jpg'
import adeptus_custodes from 'assets/resources/armies/adeptus_custodes.jpg'
import adeptus_mechanicus from 'assets/resources/armies/adeptus_mechanicus.jpg'
import aeldari from 'assets/resources/armies/aeldari.jpg'
import astra_militarum from 'assets/resources/armies/astra_militarum.jpg'
import black_templars from 'assets/resources/armies/black_templars.jpg'
import blood_angels from 'assets/resources/armies/blood_angels.jpg'
import chaos_daemons from 'assets/resources/armies/chaos_daemons.jpg'
import chaos_knights from 'assets/resources/armies/chaos_knights.jpg'
import chaos_space_marines from 'assets/resources/armies/chaos_space_marines.jpg'
import dark_angels from 'assets/resources/armies/dark_angels.jpg'
import death_guard from 'assets/resources/armies/death_guard.jpg'
import drukhari from 'assets/resources/armies/drukhari.jpg'
import emperors_children from 'assets/resources/armies/emperors_children.jpg'
import genestealer_cults from 'assets/resources/armies/genestealer_cults.jpg'
import grey_knights from 'assets/resources/armies/grey_knights.jpg'
import imperial_agents from 'assets/resources/armies/imperial_agents.jpg'
import imperial_knights from 'assets/resources/armies/imperial_knights.jpg'
import leagues_of_votann from 'assets/resources/armies/leagues_of_votann.jpg'
import necrons from 'assets/resources/armies/necrons.jpg'
import orks from 'assets/resources/armies/orks.jpg'
import space_marines from 'assets/resources/armies/space_marines.jpg'
import space_wolves from 'assets/resources/armies/space_wolves.jpg'
import tau_empire from 'assets/resources/armies/tau_empire.jpg'
import thousand_sons from 'assets/resources/armies/thousand_sons.jpg'
import tyranids from 'assets/resources/armies/tyranids.jpg'
import world_eaters from 'assets/resources/armies/world_eaters.jpg'
import { Asset } from 'expo-asset'
import { memo } from 'react'
import { StyleSheet } from 'react-native'
import Animated, {
  makeMutable,
  type SharedValue,
  useAnimatedStyle
} from 'react-native-reanimated'
type ArmyBackgroundProps = {
  codex: CodexName
  scale?: SharedValue<number>
}
const ArmyBackground = ({
  codex,
  scale = makeMutable(1)
}: ArmyBackgroundProps) => {
  const image = Asset.fromModule(source[codex])

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }))

  return (
    <Animated.View style={[styles.container, rStyle]}>
      <Image
        source={{ uri: image.localUri ?? image.uri }}
        style={styles.image}
        resizeMode={Image.resizeMode.cover}
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  image: { flex: 1 },
  container: { position: 'absolute', width: '100%', height: '100%', flex: 1 }
})

const source = {
  'Adepta Sororitas': adepta_sororitas,
  'Adeptus Custodes': adeptus_custodes,
  'Adeptus Mechanicus': adeptus_mechanicus,
  Aeldari: aeldari,
  'Astra Militarum': astra_militarum,
  'Black Templars': black_templars,
  'Blood Angels': blood_angels,
  'Chaos Daemons': chaos_daemons,
  'Chaos Knights': chaos_knights,
  'Chaos Space Marines': chaos_space_marines,
  'Dark Angels': dark_angels,
  'Death Guard': death_guard,
  Drukhari: drukhari,
  "Emperor's Children": emperors_children,
  'Genestealer Cults': genestealer_cults,
  'Grey Knights': grey_knights,
  'Imperial Agents': imperial_agents,
  'Imperial Knights': imperial_knights,
  'Leagues Of Votann': leagues_of_votann,
  Necrons: necrons,
  Orks: orks,
  'Space Marines': space_marines,
  'Space Wolves': space_wolves,
  "T'au Empire": tau_empire,
  'Thousand Sons': thousand_sons,
  Tyranids: tyranids,
  'World Eaters': world_eaters
} as const satisfies Record<CodexName, string>

export default memo(ArmyBackground)
