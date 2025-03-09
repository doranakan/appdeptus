import pushApi from '../api'

const {
  useAddPushTokenMutation,
  useGetNotificationsQuery,
  useResetNotificationCountMutation
} = pushApi

export {
  useAddPushTokenMutation,
  useGetNotificationsQuery,
  useResetNotificationCountMutation
}

export { default as useNotificationUpdates } from './useNotificationUpdates'
