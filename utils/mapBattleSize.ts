import { type BattleSize } from 'appdeptus/models'

const battleSizeLabels = {
  incursion: 'Incursion',
  'strike-force': 'Strike Force',
  free: 'Unbound'
} as const satisfies Record<BattleSize, string>

const battleSizeDp = {
  incursion: 2,
  'strike-force': 3,
  free: 999
} as const satisfies Record<BattleSize, number>

const mapBattleSize = (battleSize: BattleSize): string =>
  battleSizeLabels[battleSize]

const mapBattleSizeDp = (battleSize: BattleSize): number =>
  battleSizeDp[battleSize]

export { mapBattleSizeDp }
export default mapBattleSize
