import { zodResolver } from '@hookform/resolvers/zod'
import {
  AddressAutocomplete,
  DateTimePicker,
  Input,
  NavigationHeader,
  ScreenContainer,
  ScreenTitle,
  TabMenu,
  Text,
  useToast,
  VStack
} from 'appdeptus/components'
import { router } from 'expo-router'
import { AlignLeft, Check, DollarSign, Hash, Tag } from 'lucide-react-native'
import { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { useCreateTournamentMutation } from '../../api'
import { createTournamentSchema, type CreateTournamentForm } from './schema'

const FORMAT_OPTIONS = ['Elimination', 'Swiss']

const CreateScreen = () => {
  const [createTournament] = useCreateTournamentMutation()
  const { show } = useToast()

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, isValid }
  } = useForm<CreateTournamentForm>({
    mode: 'onBlur',
    resolver: zodResolver(createTournamentSchema),
    defaultValues: {
      date: new Date(),
      format: 'single_elimination'
    }
  })

  const format = watch('format')

  const onFormatSelected = useCallback(
    (_: string, index: number) => {
      setValue('format', index === 0 ? 'single_elimination' : 'swiss')
    },
    [setValue]
  )

  const onSubmit = async ({
    date,
    numberOfRounds,
    pointsLimit,
    price,
    description,
    ...rest
  }: CreateTournamentForm) => {
    const res = await createTournament({
      ...rest,
      date: new Date(date).toISOString(),
      numberOfRounds: numberOfRounds ? Number(numberOfRounds) : undefined,
      pointsLimit: pointsLimit ? parseInt(pointsLimit, 10) : undefined,
      price: price ? parseInt(price, 10) : undefined,
      description: description ?? undefined
    })

    if ('error' in res) {
      show({ title: '⚠️ Error', description: String(res.error) })
      return
    }

    show({
      title: '✅ Tournament created!',
      description: 'Your tournament is now open for registration.'
    })

    router.replace(`tournament/${res.data}`)
  }

  return (
    <ScreenContainer
      className='p-4'
      safeAreaInsets={['top']}
      space='md'
    >
      <NavigationHeader
        variant='backButton'
        rightButton={{
          disabled: !isValid || isSubmitting,
          icon: Check,
          loading: isSubmitting,
          onPress: handleSubmit(onSubmit),
          variant: 'callback'
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
            <ScreenTitle>Create tournament</ScreenTitle>

            <VStack space='xs'>
              <Text family='body-bold'>Format</Text>
              <TabMenu
                options={FORMAT_OPTIONS}
                onOptionSelected={onFormatSelected}
              />
            </VStack>

            {format === 'swiss' ? (
              <Controller
                control={control}
                name='numberOfRounds'
                render={({ field, fieldState }) => (
                  <VStack space='xs'>
                    <Text family='body-bold'>Number of rounds</Text>
                    <Input
                      Icon={Hash}
                      keyboardType='numeric'
                      onBlur={field.onBlur}
                      onChangeText={field.onChange}
                      placeholder='e.g. 4'
                      value={field.value ?? ''}
                    />
                    {fieldState.error ? (
                      <ErrorText message={fieldState.error.message} />
                    ) : null}
                  </VStack>
                )}
              />
            ) : null}

            <Controller
              control={control}
              name='name'
              render={({ field, fieldState }) => (
                <VStack space='xs'>
                  <Text family='body-bold'>Name</Text>
                  <Input
                    Icon={Tag}
                    onBlur={field.onBlur}
                    onChangeText={field.onChange}
                    placeholder='Tournament name'
                    value={field.value ?? ''}
                  />
                  {fieldState.error ? (
                    <ErrorText message={fieldState.error.message} />
                  ) : null}
                </VStack>
              )}
            />

            <Controller
              control={control}
              name='address'
              render={({ field, fieldState }) => (
                <VStack space='xs'>
                  <Text family='body-bold'>Address</Text>
                  <AddressAutocomplete
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    placeholder='Tournament location'
                    value={field.value ?? ''}
                  />
                  {fieldState.error ? (
                    <ErrorText message={fieldState.error.message} />
                  ) : null}
                </VStack>
              )}
            />

            <Controller
              control={control}
              name='date'
              render={({ field }) => (
                <VStack space='xs'>
                  <Text family='body-bold'>Date & Time</Text>
                  <DateTimePicker
                    value={field.value ?? new Date()}
                    onChange={field.onChange}
                  />
                </VStack>
              )}
            />

            <Controller
              control={control}
              name='pointsLimit'
              render={({ field }) => (
                <VStack space='xs'>
                  <Text family='body-bold'>Points limit (optional)</Text>
                  <Input
                    Icon={Hash}
                    keyboardType='numeric'
                    onBlur={field.onBlur}
                    onChangeText={field.onChange}
                    placeholder='e.g. 2000'
                    value={field.value ?? ''}
                  />
                </VStack>
              )}
            />

            <Controller
              control={control}
              name='price'
              render={({ field }) => (
                <VStack space='xs'>
                  <Text family='body-bold'>Entry price (optional)</Text>
                  <Input
                    Icon={DollarSign}
                    keyboardType='numeric'
                    onBlur={field.onBlur}
                    onChangeText={field.onChange}
                    placeholder='e.g. 10'
                    value={field.value ?? ''}
                  />
                </VStack>
              )}
            />

            <Controller
              control={control}
              name='description'
              render={({ field }) => (
                <VStack space='xs'>
                  <Text family='body-bold'>Description (optional)</Text>
                  <Input
                    Icon={AlignLeft}
                    multiline
                    numberOfLines={4}
                    onBlur={field.onBlur}
                    onChangeText={field.onChange}
                    placeholder='Describe your tournament...'
                    value={field.value ?? ''}
                  />
                </VStack>
              )}
            />
          </VStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  )
}

const ErrorText = ({ message }: { message?: string }) => (
  <Text
    className='text-error-200'
    family='body-regular-italic'
    size='sm'
  >
    ** {message} **
  </Text>
)

export default CreateScreen
