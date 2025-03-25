import communitiesApi from 'appdeptus/modules/communities/api/api'
import { useGetUserProfileQuery } from 'appdeptus/modules/user/api'
import { useAppDispatch } from 'appdeptus/store'
import { mapNullToUndefined } from 'appdeptus/utils'
import pushApi from '../api'
import { notificationsSchema } from '../schema'
import useNotificationUpdateListener from './useNotificationListener'

const useNotificationUpdates = () => {
  const dispatch = useAppDispatch()

  const { data: user } = useGetUserProfileQuery()

  useNotificationUpdateListener({
    eventHandler: ({ new: newData }) => {
      console.log(JSON.stringify(newData))

      if (newData.notifications.communities) {
        dispatch(
          communitiesApi.util.invalidateTags(['requests', 'communities'])
        )
      }

      dispatch(
        pushApi.util.updateQueryData(
          'getNotifications',
          undefined,
          (data) => {
            if (!data) {
              return data
            }

            const parsedData = notificationsSchema.parse(
              mapNullToUndefined(newData.notifications)
            )

            return parsedData
          },
          true
        )
      )
      return newData
    },
    userId: user?.id
  })
}

export default useNotificationUpdates
