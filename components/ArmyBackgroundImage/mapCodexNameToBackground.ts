import { CodexName } from 'appdeptus/models'

const mapCodexNameToBackground = {
  [CodexName.ADEPTA_SORORITAS]: 'adepta_sororitas',
  [CodexName.ADEPTUS_ASTARTES]: 'adeptus_astartes',
  [CodexName.ADEPTUS_MECHANICUS]: 'adeptus_mechanicus',
  [CodexName.AELDARI]: 'aeldari',
  [CodexName.ASTRA_MILITARUM]: 'astra_militarum',
  [CodexName.BLACK_TEMPLARS]: 'black_templars',
  [CodexName.BLOOD_ANGELS]: 'blood_angels',
  [CodexName.BLOOD_RAVENS]: 'blood_ravens',
  [CodexName.CHAOS_DAEMONS]: 'chaos_daemons',
  [CodexName.CHAOS_SPACE_MARINES]: 'chaos_space_marines',
  [CodexName.DARK_ANGELS]: 'dark_angels',
  [CodexName.DEATH_GUARD]: 'death_guard',
  [CodexName.DEATHWATCH]: 'deathwatch',
  [CodexName.DRUKHARI]: 'drukhari',
  [CodexName.GENESTEALER_CULTS]: 'genestealer_cults',
  [CodexName.GREY_KNIGHTS]: 'grey_knights',
  [CodexName.IMPERIAL_FISTS]: 'imperial_fists',
  [CodexName.INQUISITION]: 'inquisition',
  [CodexName.NECRONS]: 'necrons',
  [CodexName.ORKS]: 'orks',
  [CodexName.SPACE_WOLVES]: 'space_wolves',
  [CodexName.TAU]: 'tau',
  [CodexName.THOUSAND_SONS]: 'thousand_sons',
  [CodexName.TYRANIDS]: 'tyranids',
  [CodexName.WORLD_EATERS]: 'world_eaters'
} as const

export default mapCodexNameToBackground
