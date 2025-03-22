import { CardMenu, Text, themeColors, VStack } from 'appdeptus/components'
import { useGlobalSearchParams } from 'expo-router'
import { memo } from 'react'
import { RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { useGetCommunityRequestListQuery } from '../../api'

const InquisitorView = () => {
  const { id } = useGlobalSearchParams<{ id: string }>()

  const {
    data: requests,
    isFetching,
    refetch
  } = useGetCommunityRequestListQuery(id)

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          tintColor={themeColors.default.primary[300]}
          refreshing={isFetching}
          onRefresh={refetch}
        />
      }
    >
      <VStack space='md'>
        <CardMenu
          Header={
            <Text
              className='p-4 uppercase'
              family='body-bold'
            >
              Settings
            </Text>
          }
          items={[
            {
              href: `community/${id}/request-list`,
              title: 'Requests',
              variant: 'internal',
              notifications: requests?.length
            },
            {
              href: `community/${id}/manage-adepts`,
              title: 'Manage Adepts',
              variant: 'internal'
            },
            {
              href: `community/${id}/edit-name`,
              title: 'Edit name',
              variant: 'internal'
            }
          ]}
        />
        <CardMenu
          Header={
            <Text
              className='bg-tertiary-600 p-4 uppercase'
              family='body-bold'
            >
              Danger zone
            </Text>
          }
          items={[
            {
              href: `community/${id}/privacy`,
              title: 'Privacy',
              variant: 'internal'
            },
            {
              href: `community/${id}/delete`,
              title: 'Delete community',
              variant: 'internal'
            }
          ]}
        />
      </VStack>
    </ScrollView>
  )
}

export default memo(InquisitorView)
