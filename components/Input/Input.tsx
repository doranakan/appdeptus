import { FontAwesome5 } from '@expo/vector-icons'
import {
  Input as GSInput,
  InputField,
  InputSlot,
  Text
} from '@gluestack-ui/themed'

type InputProps = (typeof InputField)['defaultProps'] & {
  iconName?: string
  isInvalid?: boolean
}

const Input = ({ iconName, isInvalid, ...props }: InputProps) => (
  <GSInput
    size='md'
    isInvalid={isInvalid}
  >
    <InputField {...props} />
    {iconName ? (
      <InputSlot pr='$4'>
        <Text>
          <FontAwesome5
            name={iconName}
            size={16}
          />
        </Text>
      </InputSlot>
    ) : undefined}
  </GSInput>
)

export default Input
