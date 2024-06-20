import { FontAwesome5 } from '@expo/vector-icons'
import { Input as GSInput, InputField, InputSlot } from '@gluestack-ui/themed'
import { Text } from 'appdeptus/designSystem'

type InputProps = (typeof InputField)['defaultProps'] & {
  iconName?: string
  isInvalid?: boolean
}

const Input = ({ iconName, isInvalid, ...props }: InputProps) => (
  <GSInput
    borderRadius={0}
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
