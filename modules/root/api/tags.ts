const sessionApiTags = ['session'] as const

type SessionApiTags = (typeof sessionApiTags)[number]

export { sessionApiTags }

export type { SessionApiTags }
