import { type LucideIcon } from 'lucide-react-native'
import Button from '../Button'
import Text from '../Text'
import { VStack } from '../ui'

type OptionButtonProps = {
  icon: LucideIcon
  onPress: () => void
  title: string

  disabled?: boolean
  loading?: boolean
}

const OptionButton = ({ icon, onPress, title, ...rest }: OptionButtonProps) => (
  <VStack
    className='items-center'
    space='xs'
  >
    <Button
      {...rest}
      onPress={onPress}
      variant='callback'
      icon={icon}
      color='secondary'
    />
    <Text>{title}</Text>
  </VStack>
)

export default OptionButton
