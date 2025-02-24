import { Button, Text, VStack } from 'appdeptus/components'
import { type LucideIcon } from 'lucide-react-native'
import { type ComponentProps } from 'react'

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
      onPress={onPress}
      variant='callback'
      color='secondary'
      {...props}
    />
    <Text>{title}</Text>
  </VStack>
)

export default OptionButton
