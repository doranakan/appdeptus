import { type ComponentProps } from 'react'
import { Text } from 'react-native'
import { Pressable } from '../ui'

type ButtonProps = {
  text: string
} & ComponentProps<typeof Pressable>

const Button = ({ text, ...props }: ButtonProps) => {
  return (
    <Pressable
      className='bg-red-500 p-4 active:bg-red-400 disabled:bg-red-300'
      {...props}
    >
      <Text>{text}</Text>
    </Pressable>
  )
}

export default Button
