import {
  NavigationHeader,
  ScreenContainer,
  ScreenTitle
} from 'appdeptus/components'
import { useGlobalSearchParams } from 'expo-router'
import { useGetCommunityQuery } from '../../api'
import useIsInquisitor from '../../hooks'
import AdeptView from './AdeptView'
import InquisitorView from './InquisitorView'

const Settings = () => {
  const { id } = useGlobalSearchParams<{ id: string }>()

  const { data: community } = useGetCommunityQuery(id)

  const isInquisitor = useIsInquisitor(community?.members ?? [])

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
