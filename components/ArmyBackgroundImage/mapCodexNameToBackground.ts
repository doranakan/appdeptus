import { CodexName } from 'appdeptus/models'

const mapCodexNameToBackground = {
  [CodexName.ADEPTA_SORORITAS]: 'adeptasororitas',
  [CodexName.ADEPTUS_ASTARTES]: 'adeptusastartes',
  [CodexName.ADEPTUS_MECHANICUS]: 'adeptusmechanicus',
  [CodexName.AELDARI]: 'aeldari',
  [CodexName.ASTRA_MILITARUM]: 'astramilitarum',
  [CodexName.BLACK_TEMPLARS]: 'blacktemplars',
  [CodexName.BLOOD_ANGELS]: 'bloodangels',
  [CodexName.BLOOD_RAVENS]: 'bloodravens',
  [CodexName.CHAOS_DAEMONS]: 'chaosdaemons',
  [CodexName.CHAOS_SPACE_MARINES]: 'chaosspacemarines',
  [CodexName.DARK_ANGELS]: 'darkangels',
  [CodexName.DEATH_GUARD]: 'deathguard',
  [CodexName.DEATHWATCH]: 'deathwatch',
  [CodexName.DRUKHARI]: 'drukhari',
  [CodexName.GENESTEALER_CULTS]: 'genestealercults',
  [CodexName.GREY_KNIGHTS]: 'greyknights',
  [CodexName.IMPERIAL_FISTS]: 'imperialfists',
  [CodexName.INQUISITION]: 'inquisition',
  [CodexName.NECRONS]: 'necrons',
  [CodexName.ORKS]: 'orks',
  [CodexName.SPACE_WOLVES]: 'spacewolves',
  [CodexName.TAU]: 'tau',
  [CodexName.THOUSAND_SONS]: 'thousandsons',
  [CodexName.TYRANIDS]: 'tyranids',
  [CodexName.WORLD_EATERS]: 'worldeaters'
} as const

export default mapCodexNameToBackground
