import {
  ArmyListItem,
  Error,
  Loading,
  NavigationHeader,
  Pressable,
  ScreenContainer,
  ScreenTitle,
  Text,
  useToast,
  VStack
} from 'appdeptus/components'
import { useGetArmyListQuery } from 'appdeptus/modules/armies/api'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Check } from 'lucide-react-native'
import { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import {
  useGetTournamentQuery,
  useGetUserRegistrationListQuery,
  useSelectTournamentArmyMutation
} from '../../api'

const ArmySelectionScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()
  const { show } = useToast()
  const [selectedArmyId, setSelectedArmyId] = useState<number | null>(null)
  const [initialized, setInitialized] = useState(false)

  const {
    data: tournament,
    isLoading: tournamentLoading,
    isError: tournamentError
  } = useGetTournamentQuery(Number(id))

  const { data: registrations, isLoading: registrationsLoading } =
    useGetUserRegistrationListQuery()

  const { data: armies, isLoading: armiesLoading } = useGetArmyListQuery(
    undefined,
    {
      selectFromResult: ({ data, ...rest }) => ({
        ...rest,
        data: tournament?.pointsLimit
          ? data?.filter((a) => a.points <= tournament.pointsLimit)
          : data
      })
    }
  )

  const [selectTournamentArmy, { isLoading: isSelecting }] =
    useSelectTournamentArmyMutation()

  const registration = registrations?.find((r) => r.tournament === Number(id))

  useEffect(() => {
    if (!initialized && registration?.army) {
      setSelectedArmyId(registration.army.id)
      setInitialized(true)
    }
  }, [initialized, registration])

  const isLoading = tournamentLoading || registrationsLoading || armiesLoading

  const handleConfirm = async () => {
    if (!selectedArmyId || !registration) return

    const result = await selectTournamentArmy({
      registrationId: registration.id,
      armyId: selectedArmyId
    })

    if ('error' in result) {
      show({ title: '⚠️ Error', description: String(result.error) })
      return
    }

    router.back()
  }

  if (isLoading) {
    return (
      <ScreenContainer
        className='p-4'
        safeAreaInsets={['bottom', 'top']}
      >
        <NavigationHeader
          title='Select Army'
          variant='backButton'
        />
        <Loading />
      </ScreenContainer>
    )
  }

  if (!tournament || tournamentError) {
    return (
      <ScreenContainer
        className='p-4'
        safeAreaInsets={['bottom', 'top']}
      >
        <NavigationHeader
          title='Select Army'
          variant='backButton'
        />
        <Error description='There was an error loading the tournament' />
      </ScreenContainer>
    )
  }

  if (tournament.status !== 'ready') {
    return (
      <ScreenContainer
        className='p-4'
        safeAreaInsets={['bottom', 'top']}
        space='md'
      >
        <NavigationHeader
          title='Select Army'
          variant='backButton'
        />
        <Error description='Army selection is not open yet' />
      </ScreenContainer>
    )
  }

  if (!registration) {
    return (
      <ScreenContainer
        className='p-4'
        safeAreaInsets={['bottom', 'top']}
        space='md'
      >
        <NavigationHeader
          title='Select Army'
          variant='backButton'
        />
        <Error description='You are not registered for this tournament' />
      </ScreenContainer>
    )
  }

  if (armies?.length === 0) {
    return (
      <ScreenContainer
        className='p-4'
        safeAreaInsets={['bottom', 'top']}
        space='md'
      >
        <NavigationHeader
          title='Select Army'
          variant='backButton'
        />
        <Error
          description={
            tournament.pointsLimit
              ? `No armies within the ${tournament.pointsLimit}pts limit`
              : 'You have no armies available'
          }
        />
      </ScreenContainer>
    )
  }

  return (
    <ScreenContainer
      className='p-4'
      safeAreaInsets={['bottom', 'top']}
      space='md'
    >
      <NavigationHeader
        progress={{
          currentStep: selectedArmyId ? 4 : 3,
          steps: 4,
          text: 'Select Army'
        }}
        variant='backButton'
        rightButton={{
          disabled: !selectedArmyId,
          loading: isSelecting,
          onPress: handleConfirm,
          variant: 'callback',
          icon: Check
        }}
      />
      <VStack
        className='flex-1'
        space='md'
      >
        <ScreenTitle>{tournament.name}</ScreenTitle>
        <Text family='body-regular-italic'>
          {registration.army
            ? 'You can change your army selection below.'
            : 'The tournament is ready. Select the army you will bring.'}
        </Text>
        <FlatList
          data={armies}
          keyExtractor={(item) => String(item.id)}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                setSelectedArmyId(item.id)
              }}
            >
              <ArmyListItem
                codex={item.codex.name}
                detachment={item.detachment.name}
                name={item.name}
                points={item.points}
                isValid={item.isValid}
                variant={
                  selectedArmyId === item.id ? 'selected' : 'selectable-alt'
                }
              />
            </Pressable>
          )}
          ItemSeparatorComponent={() => <View className='h-2' />}
        />
      </VStack>
    </ScreenContainer>
  )
}

export default ArmySelectionScreen
