import { type BattleSize } from 'appdeptus/models'

const battleSizeLabels: Record<BattleSize, string> = {
  incursion: 'Incursion',
  strike_force: 'Strike Force',
  free: 'Unbound'
}

const mapBattleSize = (battleSize: BattleSize): string =>
  battleSizeLabels[battleSize]

export default mapBattleSize
