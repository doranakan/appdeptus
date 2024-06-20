import {
  Icon as GSIcon,
  Input as GSInput,
  InputField,
  InputSlot
} from '@gluestack-ui/themed'
import { type LucideIcon } from 'lucide-react-native'

type InputProps = (typeof InputField)['defaultProps'] & {
  Icon?: LucideIcon
  isInvalid?: boolean
}

const Input = ({ Icon, isInvalid, ...props }: InputProps) => (
  <GSInput
    borderRadius={0}
    size='md'
    isInvalid={isInvalid}
  >
    <InputField {...props} />
    {Icon ? (
      <InputSlot pr='$4'>
        <GSIcon
          as={Icon}
          size='lg'
        />
      </InputSlot>
    ) : undefined}
  </GSInput>
)

export default Input
