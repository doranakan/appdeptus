import { ScreenContainer, useToast } from 'appdeptus/components'
import { router } from 'expo-router'
import { useCreateCommunityMutation } from '../../api'
import { NameForm } from '../../components'

const CreateScreen = () => {
  const [createCommunity, { isLoading }] = useCreateCommunityMutation()

  const { show } = useToast()

  const onPress = async (name: string) => {
    const res = await createCommunity(name)

    if ('error' in res) {
      show({ title: '⚠️ error', description: String(res.error) })
      return
    }

    show({
      description: `${name} is now ready, share now the invitation link!`,
      title: '✅ Community created!'
    })

    router.replace(`community/${res.data}/edit-image`)
  }

  return (
    <ScreenContainer
      className='p-4'
      safeAreaInsets={['top']}
      space='md'
    >
      <NameForm
        description='Choose a unique name for your new community. As its creator, you will
        receive the Inquisitor role, granting you administrative privileges over
        the group.'
        title='Create community'
        onPress={onPress}
        loading={isLoading}
      />
    </ScreenContainer>
  )
}

export default CreateScreen
