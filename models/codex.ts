enum CodexName {
  ADEPTA_SORORITAS = 'Adepta Sororitas',
  ADEPTUS_ASTARTES = 'Adeptus Astartes',
  ADEPTUS_MECHANICUS = 'Adeptus Mechanicus',
  AELDARI = 'Aeldari',
  ASTRA_MILITARUM = 'Astra Militarum',
  BLACK_TEMPLARS = 'Black Templars',
  BLOOD_ANGELS = 'Blood Angels',
  BLOOD_RAVENS = 'Blood Ravens',
  CHAOS_DAEMONS = 'Chaos Daemons',
  CHAOS_SPACE_MARINES = 'Chaos Space Marines',
  DARK_ANGELS = 'Dark Angels',
  DEATH_GUARD = 'Death Guard',
  DEATHWATCH = 'Deathwatch',
  DRUKHARI = 'Drukhari',
  EMPERORS_CHILDREN = 'Emperors Children',
  GENESTEALER_CULTS = 'Genestealer Cults',
  GREY_KNIGHTS = 'Grey Knights',
  IMPERIAL_FISTS = 'Imperial Fists',
  INQUISITION = 'Inquisition',
  NECRONS = 'Necrons',
  ORKS = 'Orks',
  SPACE_WOLVES = 'Space Wolves',
  TAU = 'Tau',
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
