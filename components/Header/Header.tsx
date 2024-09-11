import { Heading } from 'appdeptus/components/ui/heading'
import { HStack } from 'appdeptus/components/ui/hstack'
import { Icon } from 'appdeptus/components/ui/icon'
import { Pressable } from 'appdeptus/components/ui/pressable'
import { Text } from 'appdeptus/components/ui/text'
import { config, type Colors } from 'appdeptus/designSystem'
import { Link } from 'expo-router'
import { type LucideIcon } from 'lucide-react-native'

type IconButton = {
  href: string

  disabled?: boolean
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
  <HStack className='justify-center'>
    <Heading
      size='2xl'
      className={` color-${config.tokens.colors[color]} `}
    >
      {title}
    </Heading>
    <HStack className='items-center h-full justify-between absolute w-full'>
      <HStack>
        {left ? (
          <Link
            asChild
            disabled={left.disabled}
            href={left.href}
          >
            <Pressable className='items-center flex-row gap-1'>
              {left.Icon ? (
                <Icon
                  as={left.Icon}
                  size='xl'
                  className={` color-${config.tokens.colors[color]} `}
                />
              ) : null}
              {left.text ? (
                <Text className={` color-${config.tokens.colors[color]} `}>
                  {left.text}
                </Text>
              ) : null}
            </Pressable>
          </Link>
        ) : null}
      </HStack>
      <HStack>
        {right ? (
          <Link
            asChild
            disabled={right.disabled}
            href={right.href}
          >
            <Pressable className='items-center flex-row gap-1'>
              {right.text ? (
                <Text className={` color-${config.tokens.colors[color]} `}>
                  {right.text}
                </Text>
              ) : null}
              {right.Icon ? (
                <Icon
                  as={right.Icon}
                  size='xl'
                  className={` color-${config.tokens.colors[color]} `}
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
