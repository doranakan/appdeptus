import { Badge, Card, HStack, Pressable, Text, VStack } from 'appdeptus/components'
import { type Tournament } from 'appdeptus/models'
import { format } from 'date-fns'
import { Link } from 'expo-router'
import { memo } from 'react'

type TournamentListItemProps = {
  tournament: Tournament
}

const TournamentListItem = ({ tournament }: TournamentListItemProps) => (
  <Link
    asChild
    href={`tournament/${tournament.id}`}
  >
    <Pressable>
      <Card>
        <VStack
          className='p-4'
          space='sm'
        >
          <HStack className='items-center justify-between'>
            <Text
              className='flex-1'
              family='body-bold'
              numberOfLines={1}
              size='lg'
            >
              {tournament.name}
            </Text>
            <StatusBadge status={tournament.status} />
          </HStack>
          <Text
            className='text-primary-400'
            numberOfLines={1}
          >
            {tournament.address}
          </Text>
          <HStack className='items-center justify-between'>
            <Text
              family='body-regular'
              size='sm'
            >
              {format(new Date(tournament.date), 'MMM d, yyyy')}
            </Text>
            <Text
              family='body-regular'
              size='sm'
            >
              {tournament.format === 'single_elimination' ? 'Single Elim.' : 'Swiss'}
            </Text>
          </HStack>
        </VStack>
      </Card>
    </Pressable>
  </Link>
)

const statusLabelMap: Record<Tournament['status'], string> = {
  ended: 'Ended',
  open: 'Open',
  ready: 'Ready',
  started: 'In Progress'
}

const StatusBadge = ({ status }: { status: Tournament['status'] }) => (
  <Badge text={statusLabelMap[status]} />
)

export default memo(TournamentListItem)
