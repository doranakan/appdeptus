import { Link } from 'expo-router'
import { type LucideIcon } from 'lucide-react-native'
import InnerBorder from '../InnerBorder'
import Text from '../Text'
import { HStack, Icon, LinearGradient, Pressable, VStack } from '../ui'

type BaseButton = {
  disabled?: boolean
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

const ButtonContent = ({ text, icon }: Pick<ButtonProps, 'icon' | 'text'>) => (
  <VStack className='overflow-hidden rounded-2xl'>
    <InnerBorder>
      <LinearGradient
        className='bg-gradient-to-br from-tertiary-600 to-tertiary-800'
        from='bg-tertiary-600'
        to='bg-tertiary-950'
        start={{ x: 0.3, y: 1 }}
        end={{ x: 1, y: 3 }}
      >
        <HStack
          className='items-center p-4'
          space='md'
        >
          {icon ? (
            <Icon
              className='color-primary-50'
              as={icon}
              size='xl'
            />
          ) : null}
          {text ? <Text className='text-typography-50'>{text}</Text> : null}
        </HStack>
      </LinearGradient>
    </InnerBorder>
  </VStack>
)
export default Button
