import { CodexName } from 'appdeptus/models'

const mapCodexNameToBackground = {
  [CodexName.ADEPTA_SORORITAS]: 'codex_adepta_sororitas',
  [CodexName.ADEPTUS_ASTARTES]: 'codex_adeptus_astartes',
  [CodexName.ADEPTUS_MECHANICUS]: 'codex_adeptus_mechanicus',
  [CodexName.AELDARI]: 'codex_aeldari',
  [CodexName.ASTRA_MILITARUM]: 'codex_astra_militarum',
  [CodexName.BLACK_TEMPLARS]: 'codex_black_templars',
  [CodexName.BLOOD_ANGELS]: 'codex_blood_angels',
  [CodexName.BLOOD_RAVENS]: 'codex_blood_ravens',
  [CodexName.CHAOS_DAEMONS]: 'codex_chaos_daemons',
  [CodexName.CHAOS_SPACE_MARINES]: 'codex_chaos_space_marines',
  [CodexName.DARK_ANGELS]: 'codex_dark_angels',
  [CodexName.DEATH_GUARD]: 'codex_death_guard',
  [CodexName.DEATHWATCH]: 'codex_deathwatch',
  [CodexName.DRUKHARI]: 'codex_drukhari',
  [CodexName.GENESTEALER_CULTS]: 'codex_genestealer_cults',
  [CodexName.GREY_KNIGHTS]: 'codex_grey_knights',
  [CodexName.IMPERIAL_FISTS]: 'codex_imperial_fists',
  [CodexName.INQUISITION]: 'codex_inquisition',
  [CodexName.NECRONS]: 'codex_necrons',
  [CodexName.ORKS]: 'codex_orks',
  [CodexName.SPACE_WOLVES]: 'codex_space_wolves',
  [CodexName.TAU]: 'codex_tau',
  [CodexName.THOUSAND_SONS]: 'codex_thousand_sons',
  [CodexName.TYRANIDS]: 'codex_tyranids',
  [CodexName.WORLD_EATERS]: 'codex_world_eaters'
} as const

export default mapCodexNameToBackground
