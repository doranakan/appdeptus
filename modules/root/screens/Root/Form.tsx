import { type AuthTokenResponsePassword } from '@supabase/supabase-js'
import { Button } from 'appdeptus/components'
import { HStack } from 'appdeptus/components/ui/hstack'
import { Icon } from 'appdeptus/components/ui/icon'
import { Input, InputField } from 'appdeptus/components/ui/input'
import { Pressable } from 'appdeptus/components/ui/pressable'
import { Text } from 'appdeptus/components/ui/text'
import { VStack } from 'appdeptus/components/ui/vstack'
import { type SignInForm } from 'appdeptus/models'
import { Key, ServerCrash, Vault } from 'lucide-react-native'
import React, { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useSignInMutation } from '../../api'

const Form = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
    setError,
    setFocus
  } = useForm<SignInForm>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const [signIn, { isLoading }] = useSignInMutation()

  const onSubmit = useCallback(
    async ({ email, password }: SignInForm) => {
      const result = await signIn({
        email,
        password
      })

      if ('error' in result) {
        setError('root', {
          message: (result.error as AuthTokenResponsePassword['error'])?.message
        })
      }
    },
    [setError, signIn]
  )

  return (
    <VStack className='gap-2 w-full'>
      <Controller
        control={control}
        render={({ field: { onChange, ...props } }) => (
          <Input className='items-center bg-secondary-50'>
            <InputField
              {...props}
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType='email-address'
              onChangeText={onChange}
              onSubmitEditing={() => {
                setFocus('password')
              }}
              placeholder='Email'
              returnKeyType='next'
              textContentType='emailAddress'
            />
            <VStack className='pr-4'>
              <Icon
                as={Vault}
                className='text-secondary-500'
              />
            </VStack>
          </Input>
        )}
        name='email'
      />
      <Controller
        control={control}
        render={({ field: { onChange, ...props } }) => (
          <Input className='items-center bg-secondary-50'>
            <InputField
              {...props}
              onChangeText={onChange}
              onSubmitEditing={handleSubmit(onSubmit)}
              placeholder='Password'
              type='password'
            />
            <VStack className='pr-4'>
              <Icon
                as={Key}
                className='text-secondary-500'
              />
            </VStack>
          </Input>
        )}
        name='password'
      />
      <Pressable
        disabled={!touchedFields.email && !touchedFields.password}
        onPress={handleSubmit(onSubmit)}
      >
        <Button
          loading={isLoading}
          text='Sign in'
        />
      </Pressable>
      {errors.root && (
        <HStack className='gap-1'>
          <Icon
            as={ServerCrash}
            className='text-primary-700'
          />
          <Text className='text-primary-700'>{errors.root.message}</Text>
        </HStack>
      )}
    </VStack>
  )
}
export default Form
