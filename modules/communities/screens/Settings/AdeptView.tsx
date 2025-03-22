import { CardMenu, Text, VStack } from 'appdeptus/components'
import { useGlobalSearchParams } from 'expo-router'
import { memo } from 'react'

const AdeptView = () => {
  const { id } = useGlobalSearchParams<{ id: string }>()

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
            href: `community/${id}/leave`,
            title: 'Leave community',
            variant: 'internal'
          }
        ]}
      />
    </VStack>
  )
}

export default memo(AdeptView)
