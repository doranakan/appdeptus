const notificationsApiTags = ['notifications'] as const

type NotificationsApiTags = (typeof notificationsApiTags)[number]

export { notificationsApiTags }

export type { NotificationsApiTags }
