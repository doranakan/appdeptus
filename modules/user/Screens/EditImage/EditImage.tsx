import {
  Avatar,
  Error,
  Loading,
  NavigationHeader,
  ScreenContainer,
  ScreenTitle,
  Text,
  useToast,
  VStack
} from 'appdeptus/components'
import { Edit, RefreshCcw } from 'lucide-react-native'
import { useGetUserProfileQuery, useUpdateUserImageMutation } from '../../api'

const EditNameScreen = () => {
  const { data, isError, isFetching, refetch } = useGetUserProfileQuery()

  const [updateImage, { isLoading }] = useUpdateUserImageMutation()

  const { show } = useToast()

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
      <ScreenContainer>
        <NavigationHeader variant='backButton' />
        <VStack className='items-center justify-center'>
          <Loading />
        </VStack>
      </ScreenContainer>
    )
  }

  return (
    <ScreenContainer
      className='p-4'
      safeAreaInsets={['top', 'bottom']}
      space='md'
    >
      <NavigationHeader
        variant='backButton'
        rightButton={{
          onPress: async () => {
            const res = await updateImage(data.image)

            if ('error' in res) {
              show({ title: '⚠️ error', description: String(res.error) })
            }
          },
          variant: 'callback',
          loading: isLoading,
          disabled: isLoading,
          icon: Edit
        }}
      />
      <ScreenTitle>profile image</ScreenTitle>
      <Text
        className='uppercase'
        family='body-bold'
      >
        Choose from device gallery
      </Text>
      <VStack
        className='flex-1 items-center justify-center'
        space='md'
      >
        <Avatar
          {...data}
          size='2xl'
        />
      </VStack>
      <VStack className='flex-1' />
    </ScreenContainer>
  )
}

export default EditNameScreen
