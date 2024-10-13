import { Skull } from 'lucide-react-native'
import { type ComponentProps } from 'react'
import { Icon, Pressable } from '../ui'

type ButtonProps = {
  text: string
} & ComponentProps<typeof Pressable>

const Button = ({ text, ...props }: ButtonProps) => {
  return (
    <Pressable
      className='rounded-2xl bg-tertiary-600 p-4 active:bg-tertiary-500 disabled:bg-tertiary-400'
      {...props}
    >
      <Icon
        className='color-primary-50'
        as={Skull}
        size='xl'
      />
    </Pressable>
  )
}

export default Button
