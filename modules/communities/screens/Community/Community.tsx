import {
  CardMenu,
  Error,
  Loading,
  NavigationHeader,
  Profile,
  ScreenContainer,
  Text
} from 'appdeptus/components'
import { useLocalSearchParams } from 'expo-router'
import { Cog } from 'lucide-react-native'
import { useGetCommunityQuery } from '../../api'

const CommunityScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>()

  const { data, isFetching, isError } = useGetCommunityQuery(id)

  if (isFetching) {
    return (
      <ScreenContainer
        className='p-4'
        safeAreaInsets={['bottom', 'top']}
      >
        <NavigationHeader variant='backButton' />
        <Loading />
      </ScreenContainer>
    )
  }

  if (!data || isError) {
    return (
      <ScreenContainer
        className='p-4'
        safeAreaInsets={['bottom', 'top']}
      >
        <NavigationHeader variant='backButton' />
        <Error description='There was an error with your request' />
      </ScreenContainer>
    )
  }

  return (
    <ScreenContainer
      className='p-4'
      safeAreaInsets={['bottom', 'top']}
      space='md'
    >
      <NavigationHeader
        variant='backButton'
        title='community'
        rightButton={{
          href: `communities/${id}/settings`,
          variant: 'link',
          color: 'secondary',
          icon: Cog
        }}
      />
      <Profile
        date={data.createdAt}
        {...data}
        variant='community'
      />
      <CardMenu
        Header={
          <Text
            className='p-4 uppercase'
            family='body-bold'
          >
            Browse community
          </Text>
        }
        items={[
          {
            href: `communities/${data.id}/members`,
            title: 'Members',
            variant: 'internal'
          },
          {
            href: `communities/${data.id}/armies`,
            title: 'Armies',
            variant: 'internal'
          },
          {
            href: `communities/${data.id}/games`,
            title: 'Games',
            variant: 'internal'
          },
          {
            href: `communities/${data.id}/leaderboard`,
            title: 'Leaderboard',
            variant: 'internal'
          }
        ]}
      />
    </ScreenContainer>
  )
}

export default CommunityScreen
