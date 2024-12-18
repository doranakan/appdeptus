import {
  Button,
  Input,
  Text,
  TextLink,
  useToast,
  VStack
} from 'appdeptus/components'
import { router } from 'expo-router'
import { AtSign, Key } from 'lucide-react-native'
import { useCallback, useState } from 'react'
import { useSignInMutation } from '../../api'

const Form = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [signIn, { isLoading }] = useSignInMutation()

  const { show } = useToast()

  const handleSignIn = useCallback(async () => {
    const res = await signIn({ email, password })

    if ('error' in res) {
      show({ title: '⚠️ error', description: String(res.error) })
      return
    }

    router.replace('/')
  }, [email, password, show, signIn])

  return (
    <VStack space='md'>
      <Input
        Icon={AtSign}
        onChangeText={setEmail}
        placeholder='munitorum@imperium.gov'
        keyboardType='email-address'
        autoCorrect={false}
        value={email}
      />
      <Input
        Icon={Key}
        onChangeText={setPassword}
        onSubmitEditing={handleSignIn}
        placeholder='classified_authority_code'
        textContentType='password'
        secureTextEntry={true}
        type='password'
        value={password}
      />
      <Button
        className='shadow-sm'
        loading={isLoading}
        onPress={handleSignIn}
        variant='callback'
        text='Sign in'
      />
      <Text size='sm'>
        {"You're not an Appdept yet? "}
        <TextLink href='registration'>Become an Appdept</TextLink>
      </Text>
    </VStack>
  )
}

export default Form
