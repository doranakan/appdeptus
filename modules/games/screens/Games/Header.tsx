import { HStack, Heading, Icon, Pressable } from '@gluestack-ui/themed'
import { QrCode, Swords } from 'lucide-react-native'

const Header = () => (
  <HStack justifyContent='center'>
    <Heading
      color='$secondary50'
      fontFamily='$mono'
      textTransform='capitalize'
      size='4xl'
    >
      Games
    </Heading>
    <HStack
      alignItems='center'
      h='$full'
      justifyContent='space-between'
      position='absolute'
      w='$full'
    >
      <HStack gap='$4'>
        <Pressable>
          <Icon
            as={QrCode}
            color='$secondary50'
            size='xl'
          />
        </Pressable>
      </HStack>
      <HStack gap='$4'>
        <Pressable>
          <Icon
            as={Swords}
            color='$secondary50'
            size='xl'
          />
        </Pressable>
      </HStack>
    </HStack>
  </HStack>
)

export default Header
