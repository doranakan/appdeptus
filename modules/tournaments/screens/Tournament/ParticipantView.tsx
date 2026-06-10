import {
  Card,
  NavigationHeader,
  ScreenContainer,
  ScreenTitle,
  Text,
  themeColors,
  VStack
} from 'appdeptus/components'
import { type Tournament, type TournamentRegistration } from 'appdeptus/models'
import { useRouter } from 'expo-router'
import { noop } from 'lodash'
import { Clock, Edit } from 'lucide-react-native'
import { RefreshControl, ScrollView } from 'react-native-gesture-handler'
import TournamentDataTable from './TournamentDataTable'

type ParticipantViewProps = {
  tournament: Tournament
  registration?: TournamentRegistration
  isFetching: boolean
  refetch: () => void
}

const ParticipantView = ({
  tournament,
  registration,
  isFetching,
  refetch
}: ParticipantViewProps) => {
  const router = useRouter()

  const currentStep =
    tournament.status === 'open' ? 1 : registration?.army ? 4 : 2

  const rightButton =
    tournament.status === 'open'
      ? {
          disabled: true,
          icon: Clock,
          variant: 'callback' as const,
          onPress: noop
        }
      : {
          icon: Edit,
          variant: 'callback' as const,
          onPress: () => {
            router.push(`/tournament/army-selection/${tournament.id}`)
          }
        }

  return (
    <ScreenContainer
      className='p-4'
      safeAreaInsets={['bottom', 'top']}
      space='md'
    >
      <NavigationHeader
        progress={{
          currentStep,
          steps: 4,
          text: 'Tournament Details'
        }}
        rightButton={rightButton}
        variant='backButton'
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            tintColor={themeColors.default.primary[300]}
            onRefresh={refetch}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <VStack space='md'>
          <ScreenTitle>{tournament.name}</ScreenTitle>

          <TournamentDataTable tournament={tournament} />

          {tournament.description ? (
            <Card>
              <VStack
                className='p-4'
                space='xs'
              >
                <Text family='body-bold'>Description</Text>
                <Text family='body-regular-italic'>{tournament.description}</Text>
              </VStack>
            </Card>
          ) : null}
        </VStack>
      </ScrollView>
    </ScreenContainer>
  )
}

export default ParticipantView
