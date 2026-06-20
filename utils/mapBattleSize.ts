import { type BattleSize } from 'appdeptus/models'

const battleSizeLabels: Record<BattleSize, string> = {
  incursion: 'Incursion',
  'strike-force': 'Strike Force',
  free: 'Unbound'
}

const battleSizeDp: Record<BattleSize, number | null> = {
  incursion: 2,
  'strike-force': 3,
  free: null
}

const mapBattleSize = (battleSize: BattleSize): string =>
  battleSizeLabels[battleSize]

const mapBattleSizeDp = (battleSize: BattleSize): number =>
  battleSizeDp[battleSize] ?? 0

export { mapBattleSizeDp }
export default mapBattleSize
