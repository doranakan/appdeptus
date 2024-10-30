import { type LucideIcon } from 'lucide-react-native'
import { memo } from 'react'
import InnerBorder from '../InnerBorder'
import { Icon as GSIcon, VStack } from '../ui'

type IconBadgeProps = {
  Icon: LucideIcon
}

const IconBadge = ({ Icon }: IconBadgeProps) => (
  <VStack className='rounded-xl bg-primary-950'>
    <InnerBorder rounded='rounded-xl'>
      <VStack className='p-2'>
        <GSIcon
          as={Icon}
          className='color-primary-50'
          size='md'
        />
      </VStack>
    </InnerBorder>
  </VStack>
)

export default memo(IconBadge)
