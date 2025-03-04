import {
  Card,
  HStack,
  NavigationHeader,
  ScreenContainer,
  ScreenTitle,
  Text,
  themeColors,
  useToast
} from 'appdeptus/components'
import { router, useGlobalSearchParams } from 'expo-router'
import { Save } from 'lucide-react-native'
import { useEffect, useState } from 'react'
import { Switch } from 'react-native-gesture-handler'
import {
  useGetCommunityQuery,
  useUpdateCommunityVisibilityMutation
} from '../../api'

const PrivacyScreen = () => {
  const { id } = useGlobalSearchParams<{ id: string }>()

  const { data: community } = useGetCommunityQuery(id)

  const [isPublic, setIsPublic] = useState(!community?.isSecret)

  const [updateVisibility, { isLoading }] =
    useUpdateCommunityVisibilityMutation()

  const { show } = useToast()

  useEffect(() => {
    if (community && isPublic !== !community.isSecret) {
      setIsPublic(!community.isSecret)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [community])

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
            const res = await updateVisibility({
              id: Number(id),
              secret: !isPublic
            })

            if ('error' in res) {
              show({ title: '⚠️ error', description: String(res.error) })
              return
            }

            show({
              title: '✅ Operation success!',
              description: 'Privacy settings have been saved.'
            })

            router.back()
          },
          variant: 'callback',
          disabled: isPublic === !community?.isSecret,
          loading: isLoading,
          icon: Save
        }}
      />

      <ScreenTitle>Privacy</ScreenTitle>

      <Text family='body-regular-italic'>
        In this section, you can choose whether your community is Public or
        Private. Adjust this setting based on how open you want your community
        to be.
      </Text>
      <Text>
        <Text family='body-bold'>• Public Community:</Text> All users, including
        non-members, can see all the content within the community, just like its
        members.
      </Text>
      <Text>
        <Text family='body-bold'>• Private Community:</Text> Only approved
        members can access and view the content.
      </Text>

      <Card>
        <HStack className='items-center justify-between p-4'>
          <Text family='body-bold'>Public community</Text>
          <Switch
            trackColor={{ true: themeColors.default.tertiary[600] }}
            value={isPublic}
            onValueChange={setIsPublic}
          />
        </HStack>
      </Card>
    </ScreenContainer>
  )
}

export default PrivacyScreen
