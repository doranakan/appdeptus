const communitiesApiTags = ['communities', 'requests'] as const

type CommunitiesApiTags = (typeof communitiesApiTags)[number]

export { communitiesApiTags }

export type { CommunitiesApiTags }
