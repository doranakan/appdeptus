import { FontAwesome5 } from '@expo/vector-icons'
import { Pressable } from '@gluestack-ui/themed'
import { Text } from 'appdeptus/designSystem'

type ButtonProps = {
  iconName: string
  onPress: () => void
  title: string
}

const ActionButton = ({ iconName, onPress, title }: ButtonProps) => (
  <Pressable
    alignItems='center'
    backgroundColor='$backgroundLight50'
    borderColor='$blueGray300'
    borderWidth='$1'
    flex={1}
    justifyContent='center'
    onPress={onPress}
    p='$4'
  >
    <Text
      color='$light500'
      size='2xl'
    >
      <FontAwesome5
        name={iconName}
        size={24}
      />
    </Text>
    <Text
      color='$light500'
      size='md'
    >
      {title}
    </Text>
  </Pressable>
)

export default ActionButton