import { type LucideIcon } from 'lucide-react-native'
import { type ComponentProps } from 'react'
import Button from '../Button'
import Text from '../Text'
import { VStack } from '../ui'

type OptionButtonProps = {
  icon: LucideIcon
  onPress: () => void
  title: string
} & Pick<ComponentProps<typeof Button>, 'disabled' | 'loading'>

const OptionButton = ({ onPress, title, ...props }: OptionButtonProps) => (
  <VStack
    className='items-center'
    space='xs'
  >
    <Button
      {...props}
      onPress={onPress}
      variant='callback'
      color='secondary'
    />
    <Text>{title}</Text>
  </VStack>
)

export default OptionButton
