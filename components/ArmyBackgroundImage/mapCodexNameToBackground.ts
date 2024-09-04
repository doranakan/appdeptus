import { CodexName } from 'appdeptus/models'

const mapCodexNameToBackground: Record<CodexName, string> = {
  [CodexName.ADEPTA_SORORITAS]: 'adepta_sororitas',
  [CodexName.ADEPTUS_CUSTODES]: 'adeptus_custodes',
  [CodexName.ADEPTUS_MECHANICUS]: 'adeptus_mechanicus',
  [CodexName.AELDARI]: 'aeldari',
  [CodexName.AGENTS_OF_THE_IMPERIUM]: 'agents_of_the_imperium',
  [CodexName.ASTRA_MILITARUM]: 'astra_militarum',
  [CodexName.BLACK_TEMPLARS]: 'black_templars',
  [CodexName.BLOOD_ANGELS]: 'blood_angels',
  [CodexName.CHAOS_DAEMONS]: 'chaos_daemons',
  [CodexName.CHAOS_SPACE_MARINES]: 'chaos_space_marines',
  [CodexName.DARK_ANGELS]: 'dark_angels',
  [CodexName.DEATH_GUARD]: 'death_guard',
  [CodexName.DRUKHARI]: 'drukhari',
  [CodexName.GENESTEALER_CULTS]: 'genestealer_cults',
  [CodexName.GREY_KNIGHTS]: 'grey_knights',
  [CodexName.LEAGUES_OF_VOTANN]: 'leagues_of_votann',
  [CodexName.NECRONS]: 'necrons',
  [CodexName.ORKS]: 'orks',
  [CodexName.SPACE_MARINES]: 'space_marines',
  [CodexName.SPACE_WOLVES]: 'space_wolves',
  [CodexName.TAU_EMPIRE]: 'tau_empire',
  [CodexName.THOUSAND_SONS]: 'thousand_sons',
  [CodexName.TYRANIDS]: 'tyranids',
  [CodexName.WORLD_EATERS]: 'world_eaters'
} as const

export default mapCodexNameToBackground
