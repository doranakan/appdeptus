import {
  Card,
  NavigationHeader,
  ScreenContainer,
  ScreenTitle,
  Text,
  themeColors,
  VStack
} from 'appdeptus/components'
import { type Tournament } from 'appdeptus/models'
import { EllipsisVertical } from 'lucide-react-native'
import { RefreshControl, ScrollView } from 'react-native-gesture-handler'
import OptionsBottomSheet from './OptionsBottomSheet'
import ref from './ref'
import TournamentDataTable from './TournamentDataTable'

type OrganizerViewProps = {
  tournament: Tournament
  isFetching: boolean
  refetch: () => void
}

const OrganizerView = ({
  tournament,
  isFetching,
  refetch
}: OrganizerViewProps) => (
  <ScreenContainer
    className='p-4'
    safeAreaInsets={['bottom', 'top']}
    space='md'
  >
    <NavigationHeader
      progress={{ currentStep: 2, steps: 2, text: 'Tournament Details' }}
      rightButton={{
        icon: EllipsisVertical,
        onPress: () => {
          ref.current?.present()
        },
        variant: 'callback'
      }}
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

    <OptionsBottomSheet tournament={tournament} />
  </ScreenContainer>
)

export default OrganizerView
