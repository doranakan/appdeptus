enum CodexName {
  ADEPTA_SORORITAS = 'Adepta Sororitas',
  ADEPTUS_CUSTODES = 'Adeptus Custodes',
  ADEPTUS_MECHANICUS = 'Adeptus Mechanicus',
  AELDARI = 'Aeldari',
  AGENTS_OF_THE_IMPERIUM = 'Agents of the Imperium',
  ASTRA_MILITARUM = 'Astra Militarum',
  BLACK_TEMPLARS = 'Black Templars',
  BLOOD_ANGELS = 'Blood Angels',
  CHAOS_DAEMONS = 'Chaos Daemons',
  CHAOS_SPACE_MARINES = 'Chaos Space Marines',
  DARK_ANGELS = 'Dark Angels',
  DEATH_GUARD = 'Death Guard',
  DRUKHARI = 'Drukhari',
  GENESTEALER_CULTS = 'Genestealer Cults',
  GREY_KNIGHTS = 'Grey Knights',
  LEAGUES_OF_VOTANN = 'Leagues of Votann',
  NECRONS = 'Necrons',
  ORKS = 'Orks',
  SPACE_MARINES = 'Space Marines',
  SPACE_WOLVES = 'Space Wolves',
  TAU_EMPIRE = "T'Au Empire",
  THOUSAND_SONS = 'Thousand Sons',
  TYRANIDS = 'Tyranids',
  WORLD_EATERS = 'World Eaters'
}

type Codex = {
  id: string
  name: CodexName
}

export { CodexName }

export type { Codex }
