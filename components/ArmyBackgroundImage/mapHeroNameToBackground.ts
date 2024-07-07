import { CodexName } from 'appdeptus/models'

const mapHeroNameToBackground = {
  [CodexName.ADEPTA_SORORITAS]: 'hero_adepta_sororitas',
  [CodexName.ADEPTUS_ASTARTES]: 'hero_adeptus_astartes',
  [CodexName.ADEPTUS_MECHANICUS]: 'hero_adeptus_mechanicus',
  [CodexName.AELDARI]: 'hero_aeldari',
  [CodexName.ASTRA_MILITARUM]: 'hero_astra_militarum',
  [CodexName.BLACK_TEMPLARS]: 'hero_black_templars',
  [CodexName.BLOOD_ANGELS]: 'hero_blood_angels',
  [CodexName.BLOOD_RAVENS]: 'hero_blood_ravens',
  [CodexName.CHAOS_DAEMONS]: 'hero_chaos_daemons',
  [CodexName.CHAOS_SPACE_MARINES]: 'hero_chaos_space_marines',
  [CodexName.DARK_ANGELS]: 'hero_dark_angels',
  [CodexName.DEATH_GUARD]: 'hero_death_guard',
  [CodexName.DEATHWATCH]: 'hero_deathwatch',
  [CodexName.DRUKHARI]: 'hero_drukhari',
  [CodexName.GENESTEALER_CULTS]: 'hero_genestealer_cults',
  [CodexName.GREY_KNIGHTS]: 'hero_grey_knights',
  [CodexName.IMPERIAL_FISTS]: 'hero_imperial_fists',
  [CodexName.INQUISITION]: 'hero_inquisition',
  [CodexName.NECRONS]: 'hero_necrons',
  [CodexName.ORKS]: 'hero_orks',
  [CodexName.SPACE_WOLVES]: 'hero_space_wolves',
  [CodexName.TAU]: 'hero_tau',
  [CodexName.THOUSAND_SONS]: 'hero_thousand_sons',
  [CodexName.TYRANIDS]: 'hero_tyranids',
  [CodexName.WORLD_EATERS]: 'hero_world_eaters'
} as const

export default mapHeroNameToBackground
