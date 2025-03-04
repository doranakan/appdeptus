import {
  Error,
  Loading,
  NavigationHeader,
  Profile,
  ScreenContainer,
  Text,
  VStack
} from 'appdeptus/components'
import { useLocalSearchParams } from 'expo-router'
import { useGetUserProfileQuery } from '../../api'
import ArmyList from './ArmyList'

const AdeptScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>()

  const { data, isFetching, isError } = useGetUserProfileQuery(id)

  if (isError || isFetching || !data) {
    return (
      <ScreenContainer
        className='p-4'
        safeAreaInsets={['top']}
      >
        <NavigationHeader variant='backButton' />
        <VStack className='flex-1 items-center justify-center'>
          {isFetching ? (
            <Loading />
          ) : (
            <Error description='There was an error with your request' />
          )}
        </VStack>
      </ScreenContainer>
    )
  }

  return (
    <ScreenContainer
      className='p-4'
      safeAreaInsets={['bottom', 'top']}
      space='md'
    >
      <NavigationHeader variant='backButton' />
      <Profile
        date={data.createdAt}
        {...data}
      />
      <Text
        className='uppercase'
        family='body-bold'
      >
        Armies
      </Text>
      <ArmyList userId={data.id} />
    </ScreenContainer>
  )
}

export default AdeptScreen
