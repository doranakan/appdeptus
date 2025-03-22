import {
  Avatar,
  Loading,
  NavigationHeader,
  ScreenContainer,
  ScreenTitle,
  Text,
  useToast,
  VStack
} from 'appdeptus/components'
import { useGlobalSearchParams } from 'expo-router'
import { Edit } from 'lucide-react-native'
import {
  useGetCommunityQuery,
  useUpdateCommunityImageMutation
} from '../../api'

const EditImageScreen = () => {
  const { id } = useGlobalSearchParams<{ id: string }>()

  const { data } = useGetCommunityQuery(id)

  const [updateImage, { isLoading }] = useUpdateCommunityImageMutation()

  const { show } = useToast()

  if (!data) {
    return (
      <ScreenContainer
        className='p-4'
        safeAreaInsets={['top']}
        space='md'
      >
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
      safeAreaInsets={['top']}
      space='md'
    >
      <NavigationHeader
        variant='backButton'
        rightButton={{
          onPress: async () => {
            const res = await updateImage(data)

            if ('error' in res) {
              show({ title: '⚠️ error', description: String(res.error) })
            }
          },
          variant: 'callback',
          icon: Edit,
          disabled: isLoading,
          loading: isLoading
        }}
      />
      <ScreenTitle>Edit Community Image</ScreenTitle>
      <Text family='body-regular-italic'>Choose from this device gallery.</Text>
      <VStack className='flex-1 items-center justify-center'>
        <Avatar
          {...data}
          size='2xl'
        />
      </VStack>
      <VStack className='flex-1' />
    </ScreenContainer>
  )
}

export default EditImageScreen
