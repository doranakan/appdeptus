import { type ComponentProps } from 'react'
import Button from '../Button'
import NotificationBadge from '../NotificationBadge'
import Text from '../Text'
import { VStack } from '../ui'

type OptionButtonProps = {
  text: string

  notifications?: number
} & ComponentProps<typeof Button>

const OptionButton = ({ text, notifications, ...props }: OptionButtonProps) => (
  <VStack
    className='items-center'
    space='xs'
  >
    <Button
      text=''
      color='secondary'
      {...props}
    />
    <Text>{text}</Text>
    {notifications ? (
      <VStack className='absolute right-0 top-0'>
        <NotificationBadge count={notifications} />
      </VStack>
    ) : null}
  </VStack>
)

export default OptionButton
