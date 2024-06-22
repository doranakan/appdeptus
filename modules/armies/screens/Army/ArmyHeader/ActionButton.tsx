import { Icon as GSIcon, Pressable, Text } from '@gluestack-ui/themed'
import { type LucideIcon } from 'lucide-react-native'

type ButtonProps = {
  Icon: LucideIcon
  onPress: () => void
  title: string
}

const ActionButton = ({ Icon, onPress, title }: ButtonProps) => (
  <Pressable
    alignItems='center'
    backgroundColor='$backgroundLight50'
    borderColor='$secondary300'
    borderWidth='$1'
    flex={1}
    justifyContent='center'
    onPress={onPress}
    p='$4'
  >
    <GSIcon
      as={Icon}
      color='$light500'
      size='xl'
    />

    <Text
      color='$light500'
      size='md'
    >
      {title}
    </Text>
  </Pressable>
)

export default ActionButton
