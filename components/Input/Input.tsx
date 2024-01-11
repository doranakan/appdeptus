import React from 'react'
import {
  Input as GSInput,
  Icon,
  InputField,
  InputIcon,
  InputSlot
} from '@gluestack-ui/themed'

type InputProps = (typeof InputField)['defaultProps'] & {
  Icon?: any
  isInvalid?: boolean
}

const Input = ({ Icon, isInvalid, ...props }: InputProps) => (
  <GSInput size='xl' isInvalid={isInvalid}>
    <InputField {...props} />
    {Icon ? (
      <InputSlot pr='$4'>
        <InputIcon as={Icon} />
      </InputSlot>
    ) : undefined}
  </GSInput>
)

export default Input
