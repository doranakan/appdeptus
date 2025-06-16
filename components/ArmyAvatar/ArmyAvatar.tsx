import Image from '@d11/react-native-fast-image'
import { type CodexName } from 'appdeptus/models'
import adepta_sororitas from 'assets/resources/avatars/adepta_sororitas.jpg'
import adeptus_custodes from 'assets/resources/avatars/adeptus_custodes.jpg'
import adeptus_mechanicus from 'assets/resources/avatars/adeptus_mechanicus.jpg'
import aeldari from 'assets/resources/avatars/aeldari.jpg'
import astra_militarum from 'assets/resources/avatars/astra_militarum.jpg'
import black_templars from 'assets/resources/avatars/black_templars.jpg'
import blood_angels from 'assets/resources/avatars/blood_angels.jpg'
import chaos_daemons from 'assets/resources/avatars/chaos_daemons.jpg'
import chaos_knights from 'assets/resources/avatars/chaos_knights.jpg'
import chaos_space_marines from 'assets/resources/avatars/chaos_space_marines.jpg'
import dark_angels from 'assets/resources/avatars/dark_angels.jpg'
import death_guard from 'assets/resources/avatars/death_guard.jpg'
import drukhari from 'assets/resources/avatars/drukhari.jpg'
import emperors_children from 'assets/resources/avatars/emperors_children.jpg'
import genestealer_cults from 'assets/resources/avatars/genestealer_cults.jpg'
import grey_knights from 'assets/resources/avatars/grey_knights.jpg'
import imperial_agents from 'assets/resources/avatars/imperial_agents.jpg'
import imperial_knights from 'assets/resources/avatars/imperial_knights.jpg'
import leagues_of_votann from 'assets/resources/avatars/leagues_of_votann.jpg'
import necrons from 'assets/resources/avatars/necrons.jpg'
import orks from 'assets/resources/avatars/orks.jpg'
import space_marines from 'assets/resources/avatars/space_marines.jpg'
import space_wolves from 'assets/resources/avatars/space_wolves.jpg'
import tau_empire from 'assets/resources/avatars/tau_empire.jpg'
import thousand_sons from 'assets/resources/avatars/thousand_sons.jpg'
import tyranids from 'assets/resources/avatars/tyranids.jpg'
import world_eaters from 'assets/resources/avatars/world_eaters.jpg'
import { Asset } from 'expo-asset'
import { memo } from 'react'
import { StyleSheet } from 'react-native'

type ArmyAvatarsProps = {
  codex: CodexName
}
const ArmyAvatars = ({ codex }: ArmyAvatarsProps) => {
  const image = Asset.fromModule(source[codex])

  return (
    <Image
      source={{ uri: image.localUri ?? image.uri }}
      style={styles.image}
      resizeMode={Image.resizeMode.cover}
    />
  )
}

const styles = StyleSheet.create({
  image: { position: 'absolute', width: '100%', height: '100%', flex: 1 }
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

export default memo(ArmyAvatars)
