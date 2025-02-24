import { ScreenContainer, useToast } from 'appdeptus/components'
import { router, useGlobalSearchParams } from 'expo-router'
import { useGetCommunityQuery, useUpdateCommunityNameMutation } from '../../api'
import { NameForm } from '../../components'

const EditNameScreen = () => {
  const { id } = useGlobalSearchParams<{ id: string }>()

  const { data } = useGetCommunityQuery(id)

  const [updateCommunityName, { isLoading }] = useUpdateCommunityNameMutation()

  const { show } = useToast()

  const onPress = async (name: string) => {
    const res = await updateCommunityName({ id: Number(id), name })

    if ('error' in res) {
      show({ title: '⚠️ error', description: String(res.error) })
      return
    }

    show({
      description: 'Community updated!',
      title: '✅ Operation success!'
    })

    router.back()
  }

  return (
    <ScreenContainer
      className='p-4'
      safeAreaInsets={['top']}
      space='md'
    >
      <NameForm
        description='Remember that community names are unique.'
        title='Edit community name'
        onPress={onPress}
        name={data?.name}
        loading={isLoading}
      />
    </ScreenContainer>
  )
}

export default EditNameScreen
