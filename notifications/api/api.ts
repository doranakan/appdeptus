import { notificationsApi } from 'appdeptus/api'
import {
  addPushToken,
  getNotifications,
  resetNotificationCount
} from './endpoints'
import { notificationsApiTags } from './tags'

const pushApi = notificationsApi
  .enhanceEndpoints({
    addTagTypes: notificationsApiTags
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      addPushToken: addPushToken(builder),
      getNotifications: getNotifications(builder),
      resetNotificationCount: resetNotificationCount(builder)
    }),
    overrideExisting: true
  })

export default pushApi
