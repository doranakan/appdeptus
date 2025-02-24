import { CardMenu, Text, VStack } from 'appdeptus/components'
import { memo } from 'react'

const InquisitorView = () => (
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
          href: 'communities/requests',
          title: 'Requests',
          variant: 'internal'
        },
        {
          href: 'communities/manage-adepts',
          title: 'Manage Adepts',
          variant: 'internal'
        },
        {
          href: 'communities/edit-name',
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
          href: 'communities/delete',
          title: 'Delete community',
          variant: 'internal'
        }
      ]}
    />
  </VStack>
)

export default memo(InquisitorView)
