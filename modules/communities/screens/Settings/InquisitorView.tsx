import { CardMenu, Text, VStack } from 'appdeptus/components'
import { useGlobalSearchParams } from 'expo-router'
import { memo } from 'react'
import { useGetCommunityRequestListQuery } from '../../api'

const InquisitorView = () => {
  const { id } = useGlobalSearchParams<{ id: string }>()

  const { data: requests } = useGetCommunityRequestListQuery(id)

  return (
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
            href: `communities/${id}/request-list`,
            title: 'Requests',
            variant: 'internal',
            notifications: requests?.length,
            disabled: !requests?.length
          },
          {
            href: `communities/${id}/manage-adepts`,
            title: 'Manage Adepts',
            variant: 'internal'
          },
          {
            href: `communities/${id}/edit-name`,
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
            href: `communities/${id}/privacy`,
            title: 'Privacy',
            variant: 'internal'
          },
          {
            href: `communities/${id}/delete`,
            title: 'Delete community',
            variant: 'internal'
          }
        ]}
      />
    </VStack>
  )
}

export default memo(InquisitorView)
