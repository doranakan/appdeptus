import {
  Error,
  Loading,
  NavigationHeader,
  ScreenContainer,
  VStack
} from 'appdeptus/components'
import { RefreshCcw } from 'lucide-react-native'
import { useGetUserProfileQuery } from '../../api'
import Form from './Form'

const EditNameScreen = () => {
  const { data, isError, isFetching, refetch } = useGetUserProfileQuery()

  if (isError) {
    return (
      <ScreenContainer className='p-4'>
        <NavigationHeader
          variant='backButton'
          rightButton={{
            variant: 'callback',
            onPress: refetch,
            icon: RefreshCcw,
            loading: isFetching
          }}
        />
        <VStack className='items-center justify-center'>
          <Error />
        </VStack>
      </ScreenContainer>
    )
  }

  if (!data) {
    return (
      <ScreenContainer className='items-center justify-center'>
        <Loading />
      </ScreenContainer>
    )
  }

  return (
    <ScreenContainer
      className='p-4'
      safeAreaInsets={['top', 'bottom']}
    >
      <Form name={data.name} />
    </ScreenContainer>
  )
}

export default EditNameScreen
