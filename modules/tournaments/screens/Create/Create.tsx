import { type BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { zodResolver } from '@hookform/resolvers/zod'
import DateTimePicker from '@react-native-community/datetimepicker'
import {
  BottomSheet,
  Card,
  CommunityListItem,
  HStack,
  Icon,
  Input,
  Loading,
  NavigationHeader,
  Pressable,
  ScreenContainer,
  ScreenTitle,
  TabMenu,
  Text,
  useToast,
  VStack
} from 'appdeptus/components'
import { type Community } from 'appdeptus/models'
import { useGetCommunityListQuery } from 'appdeptus/modules/communities/api'
import { format } from 'date-fns'
import { router } from 'expo-router'
import {
  AlignLeft,
  Calendar,
  Check,
  DollarSign,
  Hash,
  MapPin,
  Tag,
  Users,
  X
} from 'lucide-react-native'
import { useCallback, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { useCreateTournamentMutation } from '../../api'
import { createTournamentSchema, type CreateTournamentForm } from './schema'

const FORMAT_OPTIONS = ['Elimination', 'Swiss']

const CreateScreen = () => {
  const [createTournament] = useCreateTournamentMutation()
  const { show } = useToast()

  const { data: communities, isLoading: isLoadingCommunities } =
    useGetCommunityListQuery()

  const bottomSheetRef = useRef<BottomSheetModalMethods>(null)

  const [selectedCommunity, setSelectedCommunity] = useState<Omit<
    Community,
    'members'
  > | null>(null)

  const [showDatePicker, setShowDatePicker] = useState(false)
  const [datePickerMode, setDatePickerMode] = useState<'date' | 'time'>('date')

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting, isValid }
  } = useForm<CreateTournamentForm>({
    mode: 'onBlur',
    resolver: zodResolver(createTournamentSchema),
    defaultValues: {
      date: new Date(),
      format: 'single_elimination'
    }
  })

  const onFormatSelected = useCallback(
    (_: string, index: number) => {
      setValue('format', index === 0 ? 'single_elimination' : 'swiss')
    },
    [setValue]
  )

  const onSubmit = async ({
    date,
    pointsLimit,
    price,
    description,
    ...rest
  }: CreateTournamentForm) => {
    const res = await createTournament({
      ...rest,
      date: new Date(date).toISOString(),
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
                  <Input
                    Icon={MapPin}
                    onBlur={field.onBlur}
                    onChangeText={field.onChange}
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
                  <Pressable
                    onPress={() => {
                      setDatePickerMode('date')
                      setShowDatePicker(true)
                    }}
                  >
                    <Card>
                      <HStack
                        className='items-center p-4'
                        space='md'
                      >
                        <Icon
                          as={Calendar}
                          className='color-primary-300'
                        />
                        <Text family='body-bold'>
                          {format(
                            field.value ?? new Date(),
                            'MMM d, yyyy · HH:mm'
                          )}
                        </Text>
                      </HStack>
                    </Card>
                  </Pressable>
                  {showDatePicker && (
                    <DateTimePicker
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      mode={Platform.OS === 'ios' ? 'datetime' : datePickerMode}
                      textColor='white'
                      value={field.value ?? new Date()}
                      onChange={(_, date) => {
                        if (!date) {
                          setShowDatePicker(false)
                          return
                        }
                        if (Platform.OS === 'android') {
                          if (datePickerMode === 'date') {
                            const updated = new Date(field.value ?? new Date())
                            updated.setFullYear(
                              date.getFullYear(),
                              date.getMonth(),
                              date.getDate()
                            )
                            field.onChange(updated)
                            setDatePickerMode('time')
                          } else {
                            const updated = new Date(field.value ?? new Date())
                            updated.setHours(date.getHours(), date.getMinutes())
                            field.onChange(updated)
                            setShowDatePicker(false)
                            setDatePickerMode('date')
                          }
                        } else {
                          field.onChange(date)
                        }
                      }}
                    />
                  )}
                </VStack>
              )}
            />

            <VStack space='xs'>
              <Text family='body-bold'>Community (optional)</Text>
              <Pressable onPress={() => bottomSheetRef.current?.present()}>
                <Card>
                  <HStack
                    className='items-center p-4'
                    space='md'
                  >
                    <Icon
                      as={Users}
                      className='color-primary-300'
                    />
                    <Text className='flex-1'>
                      {selectedCommunity?.name ?? 'No community'}
                    </Text>
                    {selectedCommunity ? (
                      <Pressable
                        onPress={() => {
                          setValue('communityId', undefined)
                          setSelectedCommunity(null)
                        }}
                      >
                        <Icon
                          as={X}
                          className='color-primary-300'
                        />
                      </Pressable>
                    ) : null}
                  </HStack>
                </Card>
              </Pressable>
            </VStack>

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

      <BottomSheet
        ref={bottomSheetRef}
        onDismiss={() => bottomSheetRef.current?.dismiss()}
      >
        <VStack space='md'>
          <Text
            className='text-center'
            family='body-bold'
          >
            Select community
          </Text>
          {isLoadingCommunities ? (
            <Loading />
          ) : (
            communities?.map((community) => (
              <Pressable
                key={community.id}
                onPress={() => {
                  setValue('communityId', community.id)
                  setSelectedCommunity(community)
                  bottomSheetRef.current?.dismiss()
                }}
              >
                <CommunityListItem
                  community={community}
                  selected={selectedCommunity?.id === community.id}
                />
              </Pressable>
            ))
          )}
        </VStack>
      </BottomSheet>
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
