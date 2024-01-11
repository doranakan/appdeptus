import {
  AtSignIcon,
  Button,
  ButtonText,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  LockIcon,
  Text,
  VStack
} from '@gluestack-ui/themed'
import React, { useCallback, useState } from 'react'
import { useRouter } from 'expo-router'
import { supabase } from 'appdeptus/utils'
import { useBoolean } from 'ahooks'

const SignInForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errorMessage, setErrorMessage] = useState('')

  const [isLoading, { setFalse: stopLoading, setTrue: startLoading }] =
    useBoolean()

  const router = useRouter()

  const signIn = useCallback(async () => {
    startLoading()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    stopLoading()

    if (error !== null) {
      setErrorMessage(error.message)

      return
    }
    router.replace('/home')
  }, [email, password, router, startLoading, stopLoading])

  return (
    <VStack space='md' w='$full'>
      <Input size='xl' isInvalid={Boolean(errorMessage)}>
        <InputField
          onChange={(e) => {
            setEmail(e.nativeEvent.text)
          }}
          placeholder='your@email.here'
          textTransform='lowercase'
        />
        <InputSlot pr='$4'>
          <InputIcon as={AtSignIcon} />
        </InputSlot>
      </Input>

      <Input size='xl' isInvalid={Boolean(errorMessage)}>
        <InputField
          onChange={(e) => {
            setPassword(e.nativeEvent.text)
          }}
          onSubmitEditing={signIn}
          placeholder='Pa55w0rd!'
          type='password'
        />
        <InputSlot pr='$4'>
          <InputIcon as={LockIcon} />
        </InputSlot>
      </Input>

      <Button
        action={'primary'}
        variant={'solid'}
        size={'lg'}
        isDisabled={isLoading}
        onPress={signIn}
      >
        <ButtonText>Sign in</ButtonText>
      </Button>

      <Text color='$error500' size='lg'>
        {errorMessage}
      </Text>
    </VStack>
  )
}
export default SignInForm
