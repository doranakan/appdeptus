const tournamentsApiTags = [
  'tournament-list',
  'tournament-registration-list',
  'tournament-round-list',
  'tournament-match-list'
] as const

type TournamentsApiTags = (typeof tournamentsApiTags)[number]

export { tournamentsApiTags }

export type { TournamentsApiTags }
