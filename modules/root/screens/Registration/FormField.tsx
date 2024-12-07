import { Card, Input, Text, VStack } from 'appdeptus/components'
import clsx from 'clsx'
import { type LucideIcon } from 'lucide-react-native'
import { memo } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { type Registration } from './schema'

type FormFieldProps = {
  description: string
  Icon: LucideIcon
  name: keyof Registration
  placeholder: string
  title: string

  next?: keyof Registration
  password?: boolean
}

const FormField = ({
  description,
  Icon,
  name,
  next,
  placeholder,
  title,

  password
}: FormFieldProps) => {
  const { control, formState, setFocus } = useFormContext<Registration>()

  return (
    <Card>
      <VStack
        className={clsx(['p-4', formState.errors[name] && 'bg-error-500/30'])}
        space='sm'
      >
        <Text family='body-bold'>{title}</Text>
        <Text
          family='body-regular-italic'
          size='xs'
        >
          {description}.
        </Text>
        <Controller
          defaultValue=''
          control={control}
          name={name}
          render={({ field, fieldState }) => (
            <VStack space='xs'>
              <Input
                ref={field.ref}
                Icon={Icon}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                placeholder={placeholder}
                value={field.value as string}
                type={password ? 'password' : undefined}
                secureTextEntry={password}
                submitBehavior='newline'
                returnKeyType={next ? 'next' : 'done'}
                onSubmitEditing={() => {
                  if (next) {
                    setFocus(next)
                  }
                }}
              />
              {fieldState.error ? (
                <Text
                  className='text-error-200'
                  family='body-regular-italic'
                  size='sm'
                >
                  ** {fieldState.error.message} **
                </Text>
              ) : null}
            </VStack>
          )}
        />
      </VStack>
    </Card>
  )
}

export default memo(FormField)
