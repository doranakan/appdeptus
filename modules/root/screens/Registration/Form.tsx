import {
  HStack,
  NavigationHeader,
  ScreenContainer,
  Text,
  themeColors,
  VStack
} from 'appdeptus/components'
import { Code, Code2, Hash, Mail, Save } from 'lucide-react-native'
import { Controller, useFormContext } from 'react-hook-form'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Switch
} from 'react-native'
import { useSignUpMutation } from '../../api'
import { PrivacyLink } from '../../components'
import FormField from './FormField'
import { type Registration } from './schema'

const Form = () => {
  const { formState, handleSubmit, control } = useFormContext<Registration>()

  const [signUp, { isLoading }] = useSignUpMutation()

  return (
    <ScreenContainer
      safeAreaInsets={
        Platform.OS === 'android' ? ['top', 'bottom'] : ['bottom']
      }
      className='p-4'
      space='md'
    >
      <NavigationHeader
        variant='closeButton'
        rightButton={{
          disabled: !formState.isValid || isLoading,
          onPress: handleSubmit(signUp),
          loading: isLoading,
          variant: 'callback',
          icon: Save
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack
            className='pb-4'
            space='md'
          >
            <Text
              family='heading-regular'
              size='2xl'
            >
              appdept requisition form
            </Text>
            <Text>
              This registration form is a gateway for new users to create an
              account and join your plat Please fill all the fields below.
            </Text>

            <FormField
              Icon={Hash}
              description='The battle name reported on your dogtag'
              name='name'
              next='email'
              placeholder='Your battle name'
              title='Nickname'
            />

            <FormField
              Icon={Mail}
              description='Enter your contact email, you will use it to sign in'
              name='email'
              next='password'
              placeholder='your@email.com'
              title='Email'
            />

            <FormField
              Icon={Code}
              description='Enter a password that must contain one Uppercase character, one lowercase character, one numb3er and one speci@l character. It must be at least 8 characters long'
              name='password'
              next='confirmPassword'
              placeholder='Your_Classified_Level_3_Code'
              title='Sanctioned security code'
              password
            />

            <FormField
              Icon={Code2}
              description='Re-enter the same password for a double check'
              name='confirmPassword'
              placeholder='Confirm_Classified_Level_3_Code'
              title='Confirm security code'
              password
            />
            <HStack
              className='items-center justify-between'
              space='md'
            >
              <PrivacyLink />
              <Controller
                name='privacyAccepted'
                control={control}
                render={({ field }) => (
                  <Switch
                    trackColor={{ true: themeColors.default.tertiary[600] }}
                    onChange={(e) => {
                      field.onChange(e.nativeEvent.value)
                      field.onBlur()
                    }}
                    value={field.value}
                  />
                )}
              />
            </HStack>
          </VStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  )
}

export default Form
