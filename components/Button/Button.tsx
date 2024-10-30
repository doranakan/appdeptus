import clsx from 'clsx'
import { LinearGradient } from 'expo-linear-gradient'
import { Link } from 'expo-router'
import { type LucideIcon } from 'lucide-react-native'
import { memo } from 'react'
import { ActivityIndicator } from 'react-native'
import { useSelector } from 'react-redux'
import InnerBorder from '../InnerBorder'
import { selectThemeName } from '../store'
import Text from '../Text'
import { HStack, Icon, Pressable, themeColors, VStack } from '../ui'

type BaseButton = {
  className?: string
  color?: 'primary' | 'secondary' | 'tertiary'
  disabled?: boolean
  loading?: boolean
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
  onPress: () => unknown
} & BaseButton

type LinkButton = {
  variant: 'link'
  href: string
} & BaseButton

type ButtonProps = CallbackButton | LinkButton

const Button = ({ className, size = 'md', ...props }: ButtonProps) => {
  const style = clsx(
    'active:opacity-80 disabled:opacity-70 bg-primary-500 shadow-md',
    sizeToRoundedMap[size],
    className
  )
  switch (props.variant) {
    case 'callback':
      return (
        <Pressable
          {...props}
          className={style}
        >
          <ButtonContent
            size={size}
            {...props}
          />
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
            className={style}
          >
            <ButtonContent
              size={size}
              {...props}
            />
          </Pressable>
        </Link>
      )
  }
}

const ButtonContent = ({
  color = 'tertiary',
  icon,
  size,
  loading,
  text
}: Omit<ButtonProps, 'variant' | 'link' | 'onPress' | 'disabled'> & {
  size: NonNullable<ButtonProps['size']>
}) => {
  const themeName = useSelector(selectThemeName)
  return (
    <VStack className='overflow-hidden'>
      <InnerBorder rounded={sizeToRoundedMap[size]}>
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
            className={clsx(['justify-center', sizeToPaddingMap[size]])}
            space='md'
          >
            {loading ? <ActivityIndicator color='white' /> : null}
            {!loading && icon ? (
              <Icon
                className='color-primary-50'
                as={icon}
                size='xl'
              />
            ) : null}
            {!loading && text ? (
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

const sizeToRoundedMap = {
  md: 'rounded-2xl',
  sm: 'rounded-xl'
} as const satisfies Record<NonNullable<ButtonProps['size']>, string>

const sizeToPaddingMap = {
  md: 'p-3',
  sm: 'px-2 py-1'
} as const satisfies Record<NonNullable<ButtonProps['size']>, string>

export default memo(Button)
