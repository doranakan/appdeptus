import pushApi from '../api'

const useNotificationsQueryState =
  pushApi.endpoints.getNotifications.useQueryState

const {
  useAddPushTokenMutation,
  useGetNotificationsQuery,
  useResetNotificationCountMutation
} = pushApi

export {
  useAddPushTokenMutation,
  useGetNotificationsQuery,
  useNotificationsQueryState,
  useResetNotificationCountMutation
}

export { default as useNotificationUpdates } from './useNotificationUpdates'
