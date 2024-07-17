import { HStack, Heading, Icon, Pressable, Text } from '@gluestack-ui/themed'
import { config, type Colors } from 'appdeptus/designSystem'
import { Link } from 'expo-router'
import { type LucideIcon } from 'lucide-react-native'

type IconButton = {
  href: string

  Icon?: LucideIcon
  text?: string
}

type HeaderProps = {
  title: string

  color?: Colors
  left?: IconButton
  right?: IconButton
}

const Header = ({ color = 'secondary50', title, left, right }: HeaderProps) => (
  <HStack justifyContent='center'>
    <Heading
      color={config.tokens.colors[color]}
      size='2xl'
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
                  color={config.tokens.colors[color]}
                  size='xl'
                />
              ) : null}
              {left.text ? (
                <Text color={config.tokens.colors[color]}>{left.text}</Text>
              ) : null}
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
                <Text color={config.tokens.colors[color]}>{right.text}</Text>
              ) : null}
              {right.Icon ? (
                <Icon
                  as={right.Icon}
                  color={config.tokens.colors[color]}
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
