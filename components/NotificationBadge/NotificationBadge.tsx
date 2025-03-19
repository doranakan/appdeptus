import Text from '../Text'
import { VStack } from '../ui'

type NotificationBadgeProps = {
  count: number
}

const NotificationBadge = ({ count }: NotificationBadgeProps) => (
  <VStack className='h-6 w-6 items-center justify-center rounded-full bg-tertiary-600'>
    <Text
      family='body-bold'
      size='sm'
    >
      {count}
    </Text>
  </VStack>
)

export default NotificationBadge
