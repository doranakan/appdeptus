import { type LucideIcon } from 'lucide-react-native'
import { StyleSheet } from 'react-native'
import InnerBorder from '../InnerBorder'
import InsetShadow from '../InsetShadow'
import {
  Input as InputContainer,
  InputField,
  InputIcon,
  InputSlot,
  VStack
} from '../ui'

type InputProps = {
  Icon: LucideIcon
  onChangeText: (value: string) => void
  value: string

  disabled?: boolean
}

const Input = ({ Icon, onChangeText, value, disabled }: InputProps) => (
  <VStack className='w-full'>
    <InnerBorder>
      <VStack className='bg-primary-800'>
        <InsetShadow>
          <InputContainer
            className='border-0 px-4'
            variant='outline'
            isDisabled={disabled}
            isInvalid={false}
            isReadOnly={false}
          >
            <InputSlot>
              <InputIcon as={Icon} />
            </InputSlot>
            <InputField
              className='text-primary-50'
              placeholder='Enter Text here...'
              onChangeText={onChangeText}
              style={styles.textField}
              value={value}
            />
          </InputContainer>
        </InsetShadow>
      </VStack>
    </InnerBorder>
  </VStack>
)

const styles = StyleSheet.create({
  textField: {
    fontFamily: 'IBMPlexMono_400Regular'
  }
})

export default Input
