import { type LucideIcon } from 'lucide-react-native'
import { memo, type ComponentProps } from 'react'
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
} & ComponentProps<typeof InputField>

const Input = ({
  Icon,
  onChangeText,
  value,

  disabled,
  placeholder,
  ...props
}: InputProps) => (
  <VStack className='w-full'>
    <InnerBorder>
      <VStack className='bg-primary-800'>
        <InsetShadow>
          <VStack className='p-1 px-4'>
            <InputContainer
              className='border-0'
              variant='outline'
              isDisabled={disabled}
              isInvalid={false}
              isReadOnly={false}
            >
              <InputSlot>
                <InputIcon as={Icon} />
              </InputSlot>
              <InputField
                {...props}
                className='text-primary-50'
                placeholder={placeholder}
                onChangeText={onChangeText}
                style={styles.textField}
                value={value}
              />
            </InputContainer>
          </VStack>
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

export default memo(Input)
