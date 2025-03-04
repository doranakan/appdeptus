import {
  NavigationHeader,
  ScreenContainer,
  ScreenTitle
} from 'appdeptus/components'
import { useIsInquisitor } from 'appdeptus/modules/armies/hooks'
import { useGlobalSearchParams } from 'expo-router'
import { useGetCommunityQuery } from '../../api'
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
