import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import CheckEmail from './CheckEmail'
import Form from './Form'
import { type Registration, registrationSchema } from './schema'

const RegistrationScreen = () => {
  const form = useForm<Registration>({
    mode: 'onBlur',

    resolver: zodResolver(registrationSchema)
  })

  if (form.formState.isSubmitSuccessful) {
    return (
      <FormProvider {...form}>
        <CheckEmail />
      </FormProvider>
    )
  }

  return (
    <FormProvider {...form}>
      <Form />
    </FormProvider>
  )
}

export default RegistrationScreen
