import { Link } from 'expo-router'
import { type LucideIcon } from 'lucide-react-native'
import InnerBorder from '../InnerBorder'
import Text from '../Text'
import { HStack, Icon, Pressable } from '../ui'

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
  const className =
    'items-center rounded-2xl bg-tertiary-600 p-4 active:bg-tertiary-500 disabled:bg-tertiary-400'
  switch (props.variant) {
    case 'callback':
      return (
        <InnerBorder>
          <Pressable
            className={className}
            {...props}
          >
            <ButtonContent {...props} />
          </Pressable>
        </InnerBorder>
      )

    case 'link':
      return (
        <InnerBorder>
          <Link
            asChild
            href={props.href}
          >
            <Pressable
              className={className}
              {...props}
            >
              <ButtonContent {...props} />
            </Pressable>
          </Link>
        </InnerBorder>
      )
  }
}

const ButtonContent = ({ text, icon }: Pick<ButtonProps, 'icon' | 'text'>) => (
  <HStack space='md'>
    {icon ? (
      <Icon
        className='color-primary-50'
        as={icon}
        size='xl'
      />
    ) : null}
    {text ? <Text className='text-typography-50'>{text}</Text> : null}
  </HStack>
)
export default Button
