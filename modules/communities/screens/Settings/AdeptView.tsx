import { CardMenu, Text, VStack } from 'appdeptus/components'
import { memo } from 'react'

const AdeptView = () => (
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
          href: '',
          title: 'Leave community',
          variant: 'internal'
        }
      ]}
    />
  </VStack>
)

export default memo(AdeptView)
