import {
  Card,
  HStack,
  TabMenu,
  Text,
  themeColors,
  VStack
} from 'appdeptus/components'
import { useState } from 'react'
import { Switch } from 'react-native-gesture-handler'
import { PrivacyLink } from '../../components'
import Form from './Form'
import SignInWithApple from './SignInWithApple'
import SignInWithGoogle from './SignInWithGoogle'
import SignInWithMicrosoft from './SignInWithMicrosoft'

const SignIn = () => {
  const [signInMode, setSignInMode] = useState<'social' | 'email'>('social')

  const [isPrivacyAccepted, setIsPrivacyAccepted] = useState(false)

  return (
    <Card>
      <VStack
        className='p-4'
        space='md'
      >
        <Text
          family='heading-regular'
          size='xl'
        >
          Sign in
        </Text>
        {__DEV__ ? (
          <TabMenu
            onOptionSelected={setSignInMode}
            options={['social', 'email']}
          />
        ) : null}
        {signInMode === 'social' ? (
          <VStack space='md'>
            <SignInWithGoogle disabled={!isPrivacyAccepted} />
            <SignInWithApple disabled={!isPrivacyAccepted} />
            <SignInWithMicrosoft disabled={!isPrivacyAccepted} />
            <HStack
              className='items-center'
              space='md'
            >
              <Switch
                ios_backgroundColor={themeColors.default.secondary[300]}
                trackColor={{
                  false: themeColors.default.secondary[200],
                  true: themeColors.default.tertiary[600]
                }}
                onChange={(e) => {
                  setIsPrivacyAccepted(e.nativeEvent.value)
                }}
                value={isPrivacyAccepted}
              />
              <PrivacyLink />
            </HStack>
          </VStack>
        ) : (
          <Form />
        )}
      </VStack>
    </Card>
  )
}

export default SignIn
