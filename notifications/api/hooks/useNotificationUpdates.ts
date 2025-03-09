import { useGetUserProfileQuery } from 'appdeptus/modules/user/api'
import { useAppDispatch } from 'appdeptus/store'
import { mapNullToUndefined } from 'appdeptus/utils'
import pushApi from '../api'
import { notificationsSchema } from '../schema'
import useGameUpdateListener from './useNotificationListener'

const useNotificationUpdates = () => {
  const dispatch = useAppDispatch()

  const { data: user } = useGetUserProfileQuery()

  useGameUpdateListener({
    eventHandler: ({ new: newData }) => {
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
