import {
  Card,
  HStack,
  Pressable,
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

  const [counter, setCounter] = useState(0)

  return (
    <Card>
      <VStack
        className='p-4'
        space='md'
      >
        <Pressable
          onPress={() => {
            setCounter((c) => c + 1)
          }}
        >
          <Text
            family='heading-regular'
            size='xl'
          >
            Sign in
          </Text>
        </Pressable>

        {counter >= 5 ? (
          <TabMenu
            onOptionSelected={setSignInMode}
            options={['adept', 'inquisitor']}
          />
        ) : null}
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
