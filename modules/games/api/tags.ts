const gamesApiTags = ['game-list'] as const

type GamesApiTags = (typeof gamesApiTags)[number]

export { gamesApiTags }

export type { GamesApiTags }
