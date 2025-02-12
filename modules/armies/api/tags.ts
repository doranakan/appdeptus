const armiesApiTags = ['army-list'] as const

type ArmiesApiTags = (typeof armiesApiTags)[number]

export { armiesApiTags }

export type { ArmiesApiTags }
