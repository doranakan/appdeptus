import { zodResolver } from '@hookform/resolvers/zod'
import {
  Input,
  NavigationHeader,
  ScreenSubtitle,
  ScreenTitle,
  Text,
  useToast,
  VStack
} from 'appdeptus/components'
import { router } from 'expo-router'
import { Save, User } from 'lucide-react-native'
import { useCallback } from 'react'
import {
  Controller,
  FormProvider,
  type SubmitHandler,
  useForm
} from 'react-hook-form'
import { z } from 'zod'
import { useUpdateUserNameMutation } from '../../api'

type FormProps = {
  name: string
}

const Form = ({ name }: FormProps) => {
  const form = useForm<{ name: string }>({
    defaultValues: { name },
    mode: 'onChange',
    resolver: zodResolver(
      z.object({
        name: z.string().min(1, { message: 'Nickname cannot be empty' })
      })
    )
  })

  const [updateUserName] = useUpdateUserNameMutation()

  const { show } = useToast()

  const handleUpdateUserName = useCallback<SubmitHandler<{ name: string }>>(
    async ({ name }) => {
      const res = await updateUserName(name)

      if ('error' in res) {
        show({ description: String(res.error), title: '⚠️ error' })
        return
      }

      if (router.canGoBack()) {
        router.back()
        return
      }

      router.replace('/')
    },
    [show, updateUserName]
  )

  return (
    <VStack space='md'>
      <NavigationHeader
        variant='backButton'
        rightButton={{
          variant: 'callback',
          onPress: form.handleSubmit(handleUpdateUserName),
          icon: Save,
          loading: form.formState.isSubmitting,
          disabled: !form.formState.isValid && !form.formState.isDirty
        }}
      />
      <ScreenTitle>edit nickname</ScreenTitle>
      <ScreenSubtitle>choose your battle name</ScreenSubtitle>
      <FormProvider {...form}>
        <Controller
          name='name'
          control={form.control}
          disabled={form.formState.isSubmitting}
          render={({ field, fieldState }) => (
            <VStack space='md'>
              <Input
                Icon={User}
                onChangeText={field.onChange}
                placeholder='The name displayed on your dog tag'
                {...field}
                onSubmitEditing={form.handleSubmit(handleUpdateUserName)}
              />
              {fieldState.error ? (
                <Text className='text-tertiary-700'>
                  {fieldState.error.message}
                </Text>
              ) : null}
            </VStack>
          )}
        />
      </FormProvider>
    </VStack>
  )
}

export default Form
