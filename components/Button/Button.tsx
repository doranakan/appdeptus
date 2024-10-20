import clsx from 'clsx'
import { LinearGradient } from 'expo-linear-gradient'
import { Link } from 'expo-router'
import { type LucideIcon } from 'lucide-react-native'
import { useSelector } from 'react-redux'
import InnerBorder from '../InnerBorder'
import { selectThemeName } from '../store'
import Text from '../Text'
import { HStack, Icon, Pressable, themeColors, VStack } from '../ui'
type BaseButton = {
  color?: 'primary' | 'secondary' | 'tertiary'
  disabled?: boolean
  size?: 'md' | 'sm'
} & (
  | {
      icon: LucideIcon
      text?: string
    }
  | {
      icon?: LucideIcon
      text: string
    }
)

type CallbackButton = {
  variant: 'callback'
  onPress: () => void | Promise<void>
} & BaseButton

type LinkButton = {
  variant: 'link'
  href: string
} & BaseButton

type ButtonProps = CallbackButton | LinkButton

const Button = (props: ButtonProps) => {
  switch (props.variant) {
    case 'callback':
      return (
        <Pressable
          {...props}
          className='active:opacity-80 disabled:opacity-70'
        >
          <ButtonContent {...props} />
        </Pressable>
      )

    case 'link':
      return (
        <Link
          asChild
          href={props.href}
        >
          <Pressable
            {...props}
            className='active:opacity-80 disabled:opacity-70'
          >
            <ButtonContent {...props} />
          </Pressable>
        </Link>
      )
  }
}

const ButtonContent = ({
  color = 'tertiary',
  icon,
  size = 'md',
  text
}: Omit<ButtonProps, 'variant' | 'link' | 'onPress' | 'disabled'>) => {
  const themeName = useSelector(selectThemeName)
  return (
    <VStack className='overflow-hidden'>
      <InnerBorder
        rounded={clsx([
          size === 'md' && 'rounded-2xl',
          size === 'sm' && 'rounded-xl'
        ])}
      >
        <LinearGradient
          className='bg-gradient-to-br from-tertiary-600 to-tertiary-800'
          colors={[
            themeColors[themeName][color][600],
            themeColors[themeName][color][950]
          ]}
          start={{ x: 0.3, y: 1 }}
          end={{ x: 1, y: 3 }}
        >
          <HStack
            className={clsx([
              'items-center',
              size === 'md' && 'p-3',
              size === 'sm' && 'px-2 py-1'
            ])}
            space='md'
          >
            {icon ? (
              <Icon
                className='color-primary-50'
                as={icon}
                size='xl'
              />
            ) : null}
            {text ? (
              <Text
                className='uppercase'
                family='body-bold'
              >
                {text}
              </Text>
            ) : null}
          </HStack>
        </LinearGradient>
      </InnerBorder>
    </VStack>
  )
}
export default Button
