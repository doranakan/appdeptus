import { Button, Text, VStack } from 'appdeptus/components'
import { type LucideIcon } from 'lucide-react-native'

type OptionButtonProps = {
  icon: LucideIcon
  onPress: () => void
  title: string
}

const OptionButton = ({ icon, onPress, title }: OptionButtonProps) => (
  <VStack
    className='items-center'
    space='xs'
  >
    <Button
      onPress={onPress}
      variant='callback'
      icon={icon}
      color='secondary'
    />
    <Text>{title}</Text>
  </VStack>
)

export default OptionButton
