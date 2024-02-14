import { FontAwesome5 } from '@expo/vector-icons'
import { Pressable, Text } from '@gluestack-ui/themed'

type MenuButtonProps = {
  iconName: string
  onPress: () => void
  title: string
}

const MenuButton = ({ iconName, onPress, title }: MenuButtonProps) => (
  <Pressable
    alignItems='center'
    backgroundColor='$backgroundLight50'
    borderRadius='$2xl'
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

export default MenuButton
