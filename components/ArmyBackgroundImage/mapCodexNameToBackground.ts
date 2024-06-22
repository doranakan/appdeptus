import { CodexName } from 'appdeptus/models'

const mapCodexNameToBackground = {
  [CodexName.ADEPTA_SORORITAS]: 'adepta-sororitas-bkg',
  [CodexName.ADEPTUS_ASTARTES]: 'adeptus-astartes-bkg',
  [CodexName.ADEPTUS_MECHANICUS]: 'adeptus-mechanicus-bkg',
  [CodexName.AELDARI]: 'aeldari-bkg',
  [CodexName.ASTRA_MILITARUM]: 'astra-militarum-bkg',
  [CodexName.BLACK_TEMPLARS]: 'black-templars-bkg',
  [CodexName.BLOOD_ANGELS]: 'blood-angels-bkg',
  [CodexName.BLOOD_RAVENS]: 'blood-ravens-bkg',
  [CodexName.CHAOS_DAEMONS]: 'chaos-daemons-bkg',
  [CodexName.CHAOS_SPACE_MARINES]: 'chaos-space-marines-bkg',
  [CodexName.DARK_ANGELS]: 'dark-angels-bkg',
  [CodexName.DEATH_GUARD]: 'death-guard-bkg',
  [CodexName.DEATHWATCH]: 'deathwatch-bkg',
  [CodexName.DRUKHARI]: 'drukhari-bkg',
  [CodexName.GENESTEALER_CULTS]: 'genestealer-cults-bkg',
  [CodexName.GREY_KNIGHTS]: 'grey-knights-bkg',
  [CodexName.IMPERIAL_FISTS]: 'imperial-fists-bkg',
  [CodexName.INQUISITION]: 'inquisition-bkg',
  [CodexName.NECRONS]: 'necrons-bkg',
  [CodexName.ORKS]: 'orks-bkg',
  [CodexName.SPACE_WOLVES]: 'space-wolves-bkg',
  [CodexName.TAU]: 'tau-bkg',
  [CodexName.THOUSAND_SONS]: 'thousand-sons-bkg',
  [CodexName.TYRANIDS]: 'tyranids-bkg',
  [CodexName.WORLD_EATERS]: 'world-eaters-bkg'
} as const

export default mapCodexNameToBackground
