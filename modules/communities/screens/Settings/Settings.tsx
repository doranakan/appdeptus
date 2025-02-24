import {
  NavigationHeader,
  ScreenContainer,
  ScreenTitle
} from 'appdeptus/components'
import { useGetUserProfileQuery } from 'appdeptus/modules/user/api'
import { useGlobalSearchParams } from 'expo-router'
import { useGetCommunityQuery } from '../../api'
import AdeptView from './AdeptView'
import InquisitorView from './InquisitorView'

const Settings = () => {
  const { id } = useGlobalSearchParams<{ id: string }>()

  const { data: community } = useGetCommunityQuery(id)

  const { data: user } = useGetUserProfileQuery()

  const isInquisitor = community?.members.find(
    ({ id, role }) => role === 'admin' && id === user?.id
  )
  return (
    <ScreenContainer
      className='p-4'
      safeAreaInsets={['bottom', 'top']}
      space='md'
    >
      <NavigationHeader
        variant='backButton'
        title='community'
      />
      <ScreenTitle>Settings</ScreenTitle>
      {isInquisitor ? <InquisitorView /> : <AdeptView />}
    </ScreenContainer>
  )
}

export default Settings
