import { ScreenContainer, ScreenTitle } from 'appdeptus/components'
import {
  useNotificationsQueryState,
  useResetNotificationCountMutation
} from 'appdeptus/notifications/api'
import { useFocusEffect } from 'expo-router'
import { useCallback } from 'react'
import CommunityList from './CommunityList'

const CommunitiesTab = () => {
  const { data: notifications } = useNotificationsQueryState()

  const [resetNotificationCount] = useResetNotificationCountMutation()

  useFocusEffect(
    useCallback(() => {
      if (notifications?.communities) {
        resetNotificationCount('communities')
      }
    }, [notifications?.communities, resetNotificationCount])
  )
  return (
    <ScreenContainer
      className='px-4'
      space='md'
    >
      <ScreenTitle>Communities</ScreenTitle>
      <CommunityList />
    </ScreenContainer>
  )
}

export default CommunitiesTab
