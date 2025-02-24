import { ScreenContainer, ScreenTitle } from 'appdeptus/components'
import CommunityList from './CommunityList'

const CommunitiesTab = () => (
  <ScreenContainer
    className='px-4'
    space='md'
  >
    <ScreenTitle>Communities</ScreenTitle>
    <CommunityList />
  </ScreenContainer>
)

export default CommunitiesTab
