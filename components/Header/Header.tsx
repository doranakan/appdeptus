import { HStack, Heading, Icon, Pressable, Text } from '@gluestack-ui/themed'
import { Link } from 'expo-router'
import { type LucideIcon } from 'lucide-react-native'

type IconButton = {
  href: string

  Icon?: LucideIcon
  text?: string
}

type HeaderProps = {
  title: string

  left?: IconButton
  right?: IconButton
}

const Header = ({ title, left, right }: HeaderProps) => (
  <HStack justifyContent='center'>
    <Heading
      color='$secondary50'
      size='4xl'
    >
      {title}
    </Heading>
    <HStack
      alignItems='center'
      h='$full'
      justifyContent='space-between'
      position='absolute'
      w='$full'
    >
      <HStack>
        {left ? (
          <Link
            asChild
            href={left.href}
          >
            <Pressable
              alignItems='center'
              flexDirection='row'
              gap={'$1'}
            >
              {left.Icon ? (
                <Icon
                  as={left.Icon}
                  color='$secondary50'
                  size='xl'
                />
              ) : null}
              {left.text ? <Text color='$secondary50'>{left.text}</Text> : null}
            </Pressable>
          </Link>
        ) : null}
      </HStack>
      <HStack>
        {right ? (
          <Link
            asChild
            href={right.href}
          >
            <Pressable
              alignItems='center'
              flexDirection='row'
              gap={'$1'}
            >
              {right.text ? (
                <Text color='$secondary50'>{right.text}</Text>
              ) : null}
              {right.Icon ? (
                <Icon
                  as={right.Icon}
                  color='$secondary50'
                  size='xl'
                />
              ) : null}
            </Pressable>
          </Link>
        ) : null}
      </HStack>
    </HStack>
  </HStack>
)

export default Header
