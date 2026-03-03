import { SingleDataTable } from 'appdeptus/components'
import { type Tournament } from 'appdeptus/models'
import { format } from 'date-fns'

const formatLabelMap = {
  single_elimination: 'Single Elimination',
  swiss: 'Swiss'
} as const

const statusLabelMap = {
  ended: 'Ended',
  open: 'Open',
  ready: 'Ready',
  started: 'In Progress'
} as const

type TournamentDataTableProps = {
  tournament: Tournament
}

const TournamentDataTable = ({ tournament }: TournamentDataTableProps) => {
  const data = [
    {
      title: 'Date',
      value: format(new Date(tournament.date), 'MMM d, yyyy · HH:mm')
    },
    { title: 'Address', value: tournament.address },
    { title: 'Format', value: formatLabelMap[tournament.format] },
    { title: 'Status', value: statusLabelMap[tournament.status] },
    { title: 'Rounds', value: String(tournament.numberOfRounds ?? '') },
    { title: 'Points limit', value: String(tournament.pointsLimit) },
    ...(tournament.price != null
      ? [{ title: 'Entry price', value: `€${tournament.price}` }]
      : []),
    { title: 'Organizer', value: tournament.organizer.name }
  ]

  return <SingleDataTable data={data} />
}

export default TournamentDataTable
