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
import { TermsAndConditions } from '../../components'
import Form from './Form'
import SignInWithApple from './SignInWithApple'
import SignInWithGoogle from './SignInWithGoogle'
import SignInWithMicrosoft from './SignInWithMicrosoft'

const SignIn = () => {
  const [signInMode, setSignInMode] = useState<'adept' | 'inquisitor'>('adept')

  const [isTermAndCondsAccepted, setIsTermAndCondsAccepted] = useState(true)

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

        <TabMenu
          onOptionSelected={setSignInMode}
          options={['adept', 'inquisitor']}
        />
        {signInMode === 'adept' ? (
          <VStack space='md'>
            <SignInWithGoogle disabled={!isTermAndCondsAccepted} />
            <SignInWithApple disabled={!isTermAndCondsAccepted} />
            <SignInWithMicrosoft disabled={!isTermAndCondsAccepted} />
          </VStack>
        ) : (
          <Form disabled={!isTermAndCondsAccepted} />
        )}
        <HStack
          className='items-center'
          space='md'
        >
          <Switch
            ios_backgroundColor={themeColors.default.secondary[300]}
            thumbColor={themeColors.default.primary[50]}
            trackColor={{
              false: themeColors.default.secondary[300],
              true: themeColors.default.tertiary[600]
            }}
            onChange={(e) => {
              setIsTermAndCondsAccepted(e.nativeEvent.value)
            }}
            value={isTermAndCondsAccepted}
          />
          <TermsAndConditions />
        </HStack>
      </VStack>
    </Card>
  )
}

export default SignIn
