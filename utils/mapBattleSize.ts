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

const battleSizePointCap = {
  incursion: 1000,
  'strike-force': 2000,
  free: 99999
} as const satisfies Record<BattleSize, number>

const mapBattleSizeDp = (battleSize: BattleSize): number =>
  battleSizeDp[battleSize]

const mapBattleSizePointCap = (battleSize: BattleSize): number =>
  battleSizePointCap[battleSize]

export {
  battleSizeLabels,
  mapBattleSize,
  mapBattleSizeDp,
  mapBattleSizePointCap
}
